import random
import datetime

async def get_server_status():
    """
    Simulated tool to check server status.
    Why? To demonstrate that the AI can fetch real-time data from our system.
    """
    statuses = ["Excellent", "Stable", "High Load", "Maintenance Mode"]
    cpu_usage = random.randint(5, 95)
    memory_usage = random.randint(10, 80)
    
    return {
        "status": random.choice(statuses),
        "cpu_usage": f"{cpu_usage}%",
        "memory_usage": f"{memory_usage}%",
        "timestamp": datetime.datetime.now().isoformat()
    }

# Dictionary to map tool names to their functions
AVAILABLE_TOOLS = {
    "get_server_status": get_server_status
}
