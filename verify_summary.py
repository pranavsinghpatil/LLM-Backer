
import asyncio
from app.services.database import db_service
from dotenv import load_dotenv

async def check():
    load_dotenv()
    res = db_service.supabase.table('sessions').select('*').order('start_time', desc=True).limit(5).execute()
    if res.data:
        for s in res.data:
            summary = s.get('summary') or 'NONE'
            print(f"ID: {s['id']} | SUMMARY: {summary[:50]}...")
    else:
        print("NO_SESSIONS_FOUND")

if __name__ == "__main__":
    asyncio.run(check())
