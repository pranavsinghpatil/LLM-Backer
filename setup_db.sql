-- RUN THIS IN YOUR SUPABASE SQL EDITOR

-- 1. Create a table for sessions
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    duration INTERVAL,
    summary TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. Create a table for event logs (The Transcript)
CREATE TABLE IF NOT EXISTS event_logs (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- e.g., 'user_message', 'ai_response', 'tool_call', 'tool_result'
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. (Optional) Enable Realtime for these tables
-- ALTER PUBLICATION supabase_realtime ADD TABLE sessions;
-- ALTER PUBLICATION supabase_realtime ADD TABLE event_logs;
