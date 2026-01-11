import asyncio
import websockets
import uuid

async def start_client():
    """
    This is our 'Manual Test' tool.
    Formerly known as test_client.py. We renamed it so 'pytest' doesn't 
    try to run it as an automated logic test.
    """
    session_id = str(uuid.uuid4())
    uri = f"ws://localhost:8000/ws/session/{session_id}"
    
    print(f"Connecting to {uri}...")
    try:
        # Set ping_interval to 600 seconds (10 minutes) for long demo stability
        async with websockets.connect(uri, ping_interval=600) as websocket:
            print("Connected! Type a message (or 'exit' to quit).")
            
            while True:
                # Use to_thread so 'input' doesn't freeze the websocket heartbeats
                message = await asyncio.to_thread(input, "You: ")
                if message.lower() == 'exit':
                    break
                
                await websocket.send(message)
                
                print("AI: ", end="", flush=True)
                # Listen for the streamed response
                while True:
                    try:
                        # Receive a chunk
                        chunk = await websocket.recv()
                        
                        # If the server says it's done, we break the loop immediately
                        if chunk == "[DONE]":
                            print("\n")
                            break
                            
                        print(chunk, end="", flush=True)
                    except Exception as e:
                        print(f"\nStream Error: {e}")
                        break
    except Exception as e:
        print(f"\nError: {e}")
        print("backend error: 'uvicorn app.main:app --reload'")

if __name__ == "__main__":
    asyncio.run(start_client())
