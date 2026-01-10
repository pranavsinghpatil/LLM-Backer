# 08 - Post-Session Automation (The "Clean Up")

In professional software, the work doesn't end when the user clicks "Close". We need to perform **Post-Processing**.

## The Requirement
The assignment says: 
> "Once the WebSocket connection is closed... an asynchronous task should run a processing job that uses the LLM to generate a Session Summary."

## Why Background Tasks?
If the user closes the window, they want to leave *now*. They don't want to wait 10 seconds for the server to finish its summary. 
We use "Background Tasks" to say: "Okay user, you're free to go! We'll handle the paperwork in the background."

## The Automation Workflow

1.  **Connection Closed**: The WebSocket loop breaks.
2.  **Trigger**: We call a function using FastAPI's `BackgroundTasks`.
3.  **Fetch History**: The background task goes to Supabase and says "Give me every message from `session_123`."
4.  **Summarize**: We send that whole list to the LLM with a prompt: "Summarize this interaction."
5.  **Update**: We save that summary back to the `sessions` table.

## The Design Choice: Duration
We also need to calculate how long the session lasted.
- `Duration = End_Time - Start_Time`
We do this math in the background task to keep our records accurate.

## Why this is "Special"
Automation like this is how businesses handle things at scale. Imagine a support center with 1,000 calls an hour. No human can summarize all those. 
**You are building an "Autonomous AI Manager"** that reviews every session and reports the highlights.

---
**Next Step**: [09 - Best Practices](file:///c:/GitRepo/LLM-Backer/docs/09_Best_Practices.md)
