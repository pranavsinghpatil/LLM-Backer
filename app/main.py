import json
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, BackgroundTasks
from app.core.config import settings
from app.services.database import db_service
from app.services.llm_service import llm_service
from app.services.tools import AVAILABLE_TOOLS
from app.services.post_session import process_session_summary

from fastapi.middleware.cors import CORSMiddleware
import time

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title="Realtime AI Backend")

# 🛡️ Security: Add CORS middleware so our frontend can talk to us
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📝 Logging: Simple middleware to track request time
@app.middleware("http")
async def add_process_time_header(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    print(f"Request: {request.url.path} | Time: {process_time:.4f}s")
    return response

# Serve Frontend
@app.get("/")
async def serve_frontend():
    return FileResponse("frontend/index.html")

@app.get("/health")
async def health():
    return {"message": "Server is up and running!"}

# We keep a simple in-memory history for now
# Potential Doubt: "Why not store history in DB?"
# Answer: We DO store it in DB for auditing, but the LLM needs the recent history
# sent with every request. In-memory is fast for a single session.
history = {}

@app.websocket("/ws/session/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str, background_tasks: BackgroundTasks):
    await websocket.accept()
    
    try:
        # Initialize session in DB
        user_id = "anonymous_user" # In a real app, this comes from Auth
        await db_service.create_session(user_id, session_id)
        
        # Initialize history for this session
        history[session_id] = [{"role": "system", "content": "You are a helpful realtime assistant."}]
        
        while True:
            try:
                # 1. Listen for message
                user_text = await websocket.receive_text()
                print(f"User [{session_id}]: {user_text}")
                
                # 2. Log user message to DB
                asyncio.create_task(db_service.log_event(session_id, "user_message", {"text": user_text}))
                
                # 3. Add to history
                history[session_id].append({"role": "user", "content": user_text})
                
                # 4. Stream from AI (Handling Tools)
                ai_full_response = ""
                tool_calls = []
                
                async for chunk in llm_service.stream_response(history[session_id]):
                    if chunk["type"] == "content":
                        ai_full_response += chunk["value"]
                        await websocket.send_text(chunk["value"])
                    
                    elif chunk["type"] == "tool_call":
                        tc_chunk = chunk["value"]
                        if len(tool_calls) <= tc_chunk.index:
                            tool_calls.append({
                                "id": tc_chunk.id,
                                "name": tc_chunk.function.name,
                                "arguments": ""
                            })
                        if tc_chunk.function.arguments:
                            tool_calls[tc_chunk.index]["arguments"] += tc_chunk.function.arguments

                # 5. If tools were called, execute them
                if tool_calls:
                    # Add the 'assistant' message with tool_calls to history
                    history[session_id].append({
                        "role": "assistant",
                        "content": None,
                        "tool_calls": [
                            {
                                "id": tc["id"],
                                "type": "function",
                                "function": {"name": tc["name"], "arguments": tc["arguments"]}
                            } for tc in tool_calls
                        ]
                    })

                    for tc in tool_calls:
                        print(f"Running tool: {tc['name']} with args: {tc['arguments']}")
                        tool_func = AVAILABLE_TOOLS.get(tc["name"])
                        if tool_func:
                            try:
                                result = await tool_func()
                                history[session_id].append({
                                    "role": "tool",
                                    "tool_call_id": tc["id"],
                                    "name": tc["name"],
                                    "content": json.dumps(result)
                                })
                            except Exception as te:
                                print(f"Tool Error: {te}")
                                history[session_id].append({
                                    "role": "tool",
                                    "tool_call_id": tc["id"],
                                    "name": tc["name"],
                                    "content": json.dumps({"error": str(te)})
                                })
                    
                    # Call LLM again for the final answer
                    async for chunk in llm_service.stream_response(history[session_id]):
                        if chunk["type"] == "content":
                            ai_full_response += chunk["value"]
                            await websocket.send_text(chunk["value"])

                # 6. Final logging and turn completion
                history[session_id].append({"role": "assistant", "content": ai_full_response})
                asyncio.create_task(db_service.log_event(session_id, "ai_response", {"text": ai_full_response}))
                await websocket.send_text("[DONE]")
            
            except WebSocketDisconnect:
                raise
            except Exception as e:
                print(f"Error in message loop: {e}")
                import traceback
                traceback.print_exc()
                try:
                    await websocket.send_text(f"Error: {str(e)}")
                except:
                    pass
                break 
                
    except WebSocketDisconnect:
        print(f"Client disconnected: {session_id}")
    except Exception as e:
        print(f"Initialization Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        # Cleanup
        if session_id in history:
            del history[session_id]
        # TRIGGER THE AUTOMATION!
        background_tasks.add_task(process_session_summary, session_id)
