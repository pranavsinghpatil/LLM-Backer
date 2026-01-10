# 05 - Function Calling: The AI's Hands

A normal LLM is like a person trapped in a room with no internet. They are very smart, but they can't check the time, they can't see your bank balance, and they can't turn on your lights.

**Function Calling** (also called **Tool Use**) gives the AI "Hands" to interact with the real world.

## How it Works (The "Waiter" Analogy)

1.  **Preparation**: You tell the AI, "Hey, I have a tool called `get_weather(city)`. If anyone asks about the weather, don't guess! Tell me you want to use this tool."
2.  **User Asks**: "What's the weather in Tokyo?"
3.  **AI Decides**: The AI *knows* it doesn't have the live weather. Instead of answering, it sends a special message: "ACTION: Use tool `get_weather` with argument `city='Tokyo'`."
4.  **Backend Executes**: *Our Python code* sees this action. It runs the real Python function `get_weather('Tokyo')`, gets the result (e.g., "Summarily 25°C"), and sends it back to the AI.
5.  **AI Final Answer**: The AI says "It's a pleasant 25°C in Tokyo right now!"

## Why this makes our project "Advanced"
The assignment asks for "Complex LLM Interaction". Simple chatbots just talk. 
**Our backend will handle this loop**:
1. User Message -> LLM.
2. LLM asks for Tool -> Python.
3. Python runs Tool -> Result.
4. Result -> LLM.
5. LLM Final Result -> User.

## Why you need to know this
This is the future of "AI Agents". An agent is just an LLM with many tools. By learning how to implement one tool, you are learning how to build an AI that can manage a calendar, buy stocks, or control a robot.

---
**Next Step**: [06 - Supabase: The Memory](file:///c:/GitRepo/LLM-Backer/docs/06_Supabase_The_Memory.md)
