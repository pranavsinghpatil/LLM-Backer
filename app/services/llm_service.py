import json
from openai import AsyncOpenAI
from app.core.config import settings
from typing import AsyncGenerator

class LLMService:
    def __init__(self):
        """
        Using Groq as a free alternative to OpenAI.
        The OpenAI Python library is compatible with Groq by changing the base_url!
        """
        self.client = AsyncOpenAI(
            api_key=settings.GROQ_API_KEY,
            base_url="https://api.groq.com/openai/v1"
        )

    async def stream_response(self, messages: list) -> AsyncGenerator[dict, None]:
        """
        Modified to yield a dictionary. 
        Why? Because we need to know if the AI is sending 'text' or a 'tool_call'.
        """
        tools = [
            {
                "type": "function",
                "function": {
                    "name": "get_server_status",
                    "description": "Get the current simulated server performance and status.",
                    "parameters": {
                        "type": "object",
                        "properties": {},
                    },
                },
            }
        ]

        stream = await self.client.chat.completions.create(
            model="llama-3.3-70b-versatile", # Groq model
            messages=messages,
            stream=True,
            tools=tools,
            tool_choice="auto"
        )

        async for chunk in stream:
            delta = chunk.choices[0].delta
            
            # Case 1: The AI is sending normal text
            if delta.content:
                yield {"type": "content", "value": delta.content}
            
            # Case 2: The AI wants to use a tool
            if delta.tool_calls:
                yield {"type": "tool_call", "value": delta.tool_calls[0]}

# Singleton instance
llm_service = LLMService()
