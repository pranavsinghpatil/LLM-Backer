# 06 - Supabase: The Memory

If we don't have a database, our AI has "Goldfish Memory". The second the connection closes, it forgets everything. 

## What is Supabase?
Supabase is an open-source alternative to Firebase. It's basically a very pretty and easy-to-use wrapper around **Postgres**, which is the world's most popular professional database.

## Why use a Database?

1.  **Auditing**: We need to see exactly what the AI said last Tuesday at 2 PM.
2.  **Context**: If a user comes back tomorrow, we can pull their old "Event Logs" and give the AI the context of the previous conversation.
3.  **Analytics**: How many messages do people usually send? How long do sessions last?

## Our Schema (The "Spreadsheet" Design)

Think of our database like a workbook with two sheets:

### Sheet 1: `sessions`
Used to track the "Call" itself.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | A unique serial number for this session. |
| `start_time` | Timestamp | When did the call start? |
| `user_id` | Text | Who is calling? |
| `summary` | Text | (Filled at the end) What happened in this call? |

### Sheet 2: `event_logs`
Used to track every "Event" during the call.
| Column | Type | Description |
| :--- | :--- | :--- |
| `session_id` | UUID | Connects this event to the session in Sheet 1. |
| `event_type` | Text | Is this a `user_message`, `ai_chunk`, or `tool_call`? |
| `content` | JSON | The actual text or data. |

## How Python talks to Supabase
We use the `supabase-py` library. It feels like using a list or dictionary in Python:
```python
# Saving a message
supabase.table("event_logs").insert({
    "session_id": "123",
    "event_type": "user_message",
    "content": {"text": "Hello world"}
}).execute()
```

## Professional Tip: SQL
Even though Supabase makes it easy, learning `SQL` (Structured Query Language) is how you stop being a vibe coder and start being a database master. Always try to look at the "SQL Editor" in the Supabase dashboard!

---
**Next Step**: [07 - Asynchronous Python Mastery](file:///c:/GitRepo/LLM-Backer/docs/07_Async_Python.md)
