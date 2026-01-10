# 09 - Best Practices (The "Professional" Way)

To stop "vibe coding," you need to stop doing "Junior" things, like putting your API keys inside your code.

## 1. Environment Variables (`.env`)
Never, ever, EVER hardcode an API key. 
- **The Wrong Way**: `api_key = "sk-123456789"`
- **The Right Way**: Use a `.env` file and the `python-dotenv` library.

### Why?
Because you will eventually upload your code to GitHub. If your key is in the code, a bot will find it within 30 seconds and spend all your money. A `.env` file is "ignored" by GitHub, so your secrets stay on your machine.

## 2. Project Structure
Don't put everything in `main.py`. It's like putting your clothes, your dishes, and your trash in one big pile.
A professional structure looks like this:
```text
/app
  main.py          # Entry point
  /services        # Logic (AI, DB)
  /models          # Data definitions (Pydantic)
  /core            # Configuration
```

## 3. Error Handling
Vibe coders hope their code works. Professionals *know* their code will break and they plan for it.
Instead of:
```python
# Just hope it works
data = await get_from_database()
```
They do:
```python
try:
    data = await get_from_database()
except Exception as e:
    logger.error(f"Database failed: {e}")
    # Show a nice message to the user
```

## 4. Virtual Environments
Always use a `venv`. It's like a "bubble" for your project. This prevents "Version Hell" where one project needs Python version A and another needs version B.

## Summary
These things don't make the AI smarter, but they make **the developer** smarter. This is how you build software that doesn't crash, doesn't leak secrets, and is easy for other people to read.

---
**Next Step**: [10 - The Testing Workflow](file:///c:/GitRepo/LLM-Backer/docs/10_Testing.md)
