CREATE TABLE IF NOT EXISTS content (key TEXT PRIMARY KEY,value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS posts (slug TEXT PRIMARY KEY,data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS visits (id TEXT PRIMARY KEY,day TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS visits_day_idx ON visits(day);
CREATE TABLE IF NOT EXISTS pageviews (day TEXT PRIMARY KEY,total INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS media (id TEXT PRIMARY KEY,data TEXT NOT NULL,content_type TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS stream_access_codes (id TEXT PRIMARY KEY,code_hash TEXT NOT NULL UNIQUE,label TEXT NOT NULL,suffix TEXT NOT NULL,created_at TEXT NOT NULL,expires_at TEXT,revoked_at TEXT,last_used_at TEXT,use_count INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS stream_access_sessions (id TEXT PRIMARY KEY,code_id TEXT NOT NULL,token_hash TEXT NOT NULL UNIQUE,created_at TEXT NOT NULL,expires_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS stream_access_sessions_code_idx ON stream_access_sessions(code_id);
CREATE TABLE IF NOT EXISTS stream_access_attempts (key TEXT PRIMARY KEY,window_start BIGINT NOT NULL,attempts INTEGER NOT NULL DEFAULT 0);

CREATE INDEX IF NOT EXISTS stream_access_attempts_window_idx ON stream_access_attempts(window_start);
