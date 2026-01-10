# 03 - WebSockets: Real-time Magic

This is where the project goes from "Normal Web App" to "Real-time AI Experience".

## HTTP vs. WebSockets (The Difference)

### Normal HTTP (The Postcard)
1.  **Client**: "Hey Server, give me the weather."
2.  **Server**: "It's sunny."
3.  *Connection Closes.*
4.  If the weather changes 1 minute later, the Client *won't know* until it asks again.

### WebSockets (The Phone Call)
1.  **Client**: "Hey Server, let's open a line."
2.  **Server**: "Connection opened! I'm listening."
3.  **Client**: "Hello?"
4.  **Server**: "Hi there!"
5.  **Server** (5 minutes later): "By the way, it just started raining." (The server can talk *first* without being asked!)
6.  *Connection stays open until one side hangs up.*

## Why do we need it for AI?
When an AI generates an answer, it doesn't know the whole answer instantly. It thinks token by token. 
If we used HTTP, we would have to wait 10 seconds for the *whole* answer to be ready.
With WebSockets, the second the AI thinks of the word "Hello", we can push it to the user.

## The WebSocket Lifecycle

### 1. The Handshake
The client asks to "Upgrade" from HTTP to WebSocket.

### 2. The Loop
Once connected, we enter a `while True` loop.
- **Listen**: Wait for a message from the user.
- **Process**: Send message to LLM.
- **Stream**: Send chunks back to user as they come.

### 3. The Graceful Goodbye
When the user closes the tab or hits "Disconnect", the server detects the `WebSocketDisconnect` error. 
**This is our trigger** to run the post-session automation!

## Beginner Mistake to Avoid:
Don't forget that WebSockets are **stateful**. This means the server "remembers" you while you are connected. If the server restarts, every single phone call gets dropped!

---
**Next Step**: [04 - LLM Streaming Explained](file:///c:/GitRepo/LLM-Backer/docs/04_LLM_Streaming_Explained.md)
