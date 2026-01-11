import pytest
import uuid
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    """
    Check if the server is alive.
    """
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Server is up and running!"}

def test_websocket_connection():
    """
    Check if the websocket handshake works and the session is initialized.
    Note: This actually hits your Supabase (be careful in prod!)
    """
    session_id = str(uuid.uuid4())
    with client.websocket_connect(f"/ws/session/{session_id}") as websocket:
        # If we reach here, the connection was accepted
        # and create_session was called in the backend.
        assert websocket is not None
        # We don't send a message here because it might trigger LLM calls 
        # which costs money/quota. This is just a 'Connectivity Test'.
