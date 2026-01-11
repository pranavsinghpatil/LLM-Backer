from supabase import create_client, Client
from app.core.config import settings
from typing import Any, Dict

class DatabaseService:
    def __init__(self):
        """
        Why initialization?
        We create a 'Client' that knows our Supabase URL and Key.
        This client is the bridge between our Python code and the Cloud Database.
        """
        self.supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

    async def create_session(self, user_id: str, session_id: str):
        """
        Potential Doubt: 'Do I need to check if the session exists?'
        Answer: In a real app, yes. Here, we useupsert (Update or Insert) 
        to ensure we don't crash if the user refreshes the page.
        """
        data = {
            "id": session_id,
            "user_id": user_id,
        }
        return self.supabase.table("sessions").upsert(data).execute()

    async def log_event(self, session_id: str, event_type: str, content: Dict[str, Any]):
        """
        Why use JSONB for content?
        Answer: It's flexible. A 'user_message' might just be text,
        but a 'tool_call' might have function names and arguments.
        JSONB handles both without changing the table structure.
        """
        data = {
            "session_id": session_id,
            "event_type": event_type,
            "content": content
        }
        return self.supabase.table("event_logs").insert(data).execute()

    async def update_session_end(self, session_id: str, summary: str):
        """
        This is called by the background task.
        It updates the end_time and saves the generated summary.
        """
        import datetime
        data = {
            "end_time": datetime.datetime.now().isoformat(),
            "summary": summary
        }
        return self.supabase.table("sessions").update(data).eq("id", session_id).execute()

    async def get_session_logs(self, session_id: str):
        """
        Why fetch logs?
        To generate a summary, the AI needs to read the transcript of the 
        entire session from the database.
        """
        return self.supabase.table("event_logs").select("*").eq("session_id", session_id).order("created_at").execute()

# Singleton instance
db_service = DatabaseService()
