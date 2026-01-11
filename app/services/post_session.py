import json
from app.services.database import db_service
from app.services.llm_service import llm_service

async def process_session_summary(session_id: str):
    """
    The Post-Session Automation Task.
    
    Why run this in the background?
    Summarization takes time. We don't want the user to wait for us to
    finish 'paperwork' before they can close their connection.
    """
    print(f"Starting post-session summary for: {session_id}")
    
    # 1. Fetch all events for this session
    response = await db_service.get_session_logs(session_id)
    logs = response.data
    
    if not logs:
        print(f"No logs found for session {session_id}. Skipping summary.")
        return

    # 2. Format the transcript for the LLM
    transcript = ""
    for entry in logs:
        role = "User" if entry["event_type"] == "user_message" else "AI"
        content = entry["content"].get("text", "")
        transcript += f"{role}: {content}\n"

    # 3. Ask the AI to summarize
    summary_prompt = [
        {"role": "system", "content": "You are a session summarizer. Provide a concise 2-3 sentence summary of the following conversation transcript."},
        {"role": "user", "content": f"Transcript:\n{transcript}"}
    ]
    
    summary_text = ""
    # Use non-streaming for summary as we just need the final block
    # We'll use the client directly from llm_service for a simple non-streamed call
    response = await llm_service.client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=summary_prompt,
        stream=False
    )
    summary_text = response.choices[0].message.content

    # 4. Save the summary and end time to the Database
    await db_service.update_session_end(session_id, summary_text)
    print(f"Summary completed for {session_id}: {summary_text[:50]}...")
