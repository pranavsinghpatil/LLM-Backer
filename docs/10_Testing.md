# 10 - The Testing Workflow

How do you know if your code actually works? You can't just "vibe" it. You need to **Verify**.

## 1. Manual Testing (The "Eye" Test)
We will create a file called `test_client.py`. 
- This is a small script that acts like a user. 
- It will connect to our server, send "Hello", and we will watch if the server streams back.

## 2. API Documentation (The "Swagger" Test)
Because we use FastAPI, you can go to `http://localhost:8000/docs` in your browser. This gives you a UI where you can click buttons to test your endpoints without writing any frontend code.

## 3. Database Inspection (The "Vault" Test)
After you talk to the AI, you MUST check your Supabase dashboard.
- Do you see a new row in `sessions`?
- Do you see the messages in `event_logs`?
- If you don't see them, the code "worked" but the "feature" failed.

## 4. Automated Testing (The "Robot" Test)
Professionals use `pytest`. These are scripts that test your scripts. 
> Example: "I wrote a script that tests if the `calculate_duration` function works correctly."

## Troubleshooting (Don't Panic!)
When something fails (and it will!), follow this path:
1.  **Check the Terminal**: Read the "Traceback". Look for the very last line—it usually tells you exactly what happened.
2.  **Print Statements**: Use `print(f"I am at point A with data: {data}")` to see what's happening inside the "pipes".
3.  **Logs**: Check the Supabase logs and the FastAPI logs.

## You are Ready!
You have read 10 documents. You know the **What**, the **How**, and the **Why**. You are no longer just a "vibe coder". You are a **Realtime AI Backend Architect**.

---
**Back to**: [Index](file:///c:/GitRepo/LLM-Backer/docs/index.md)
