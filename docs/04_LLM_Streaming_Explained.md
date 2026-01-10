# 04 - LLM Streaming Explained

If you've used ChatGPT, you've seen the words "typing" out on the screen. That is **Streaming**.

## What is a Token?
AI doesn't read "words". It reads "Tokens". 
- A token is usually about 4 characters or 3/4 of a word.
- The word "Apple" might be 1 token.
- The word "Antigravity" might be 3 tokens.

## How Streaming Works
When we call the OpenAI API, we set a parameter called `stream=True`.

### Without Streaming (The "Buffer" way)
1. Request: "Write a poem."
2. ... (Server waits 5 seconds) ...
3. Response: "The roses are red, the violets are..." (Everything arrives at once).
4. **User Experience**: "Is it broken? Why is it taking so long?"

### With Streaming (The "Chunk" way)
1. Request: "Write a poem."
2. 0.1s later: "The"
3. 0.2s later: " roses"
4. 0.3s later: " are"
5. **User Experience**: "Wow, it's so fast! It's thinking right in front of me!"

## The Python Code Logic (Simplified)

```python
response = openai.chat.completions.create(
    model="gpt-4o",
    messages=[...],
    stream=True  # THE MAGIC BUTTON
)

for chunk in response:
    content = chunk.choices[0].delta.content
    if content:
        # We immediately send this 'content' to the WebSocket
        await websocket.send_text(content)
```

## Why this is "Hard" for Engineers
Streaming is tricky because you have to handle **errors mid-stream**. What if the internet cuts out while the AI is halfway through a word? 
Professional backends need to handle these interruptions gracefully.

## Summary
Streaming is about **perceived speed**. The AI isn't actually faster, but the user *feels* like it's faster because they get the first word immediately.

---
**Next Step**: [05 - Function Calling: The AI's Hands](file:///c:/GitRepo/LLM-Backer/docs/05_Function_Calling.md)
