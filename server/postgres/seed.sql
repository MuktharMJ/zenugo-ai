-- ==============================================================
-- SEED DATA for Zenugo AI PostgreSQL Concept Module
-- ==============================================================
-- Run this AFTER schema.sql to populate the tables with sample data.
-- This data is used to demonstrate SQL JOIN queries.
-- ==============================================================

-- Insert sample users
INSERT INTO users (name, email) VALUES
    ('Mukthar MJ', 'mukthar@zenugo.ai'),
    ('Alice Johnson', 'alice@example.com'),
    ('Bob Smith', 'bob@example.com');

-- Insert sample conversations (linked to users via user_id foreign key)
-- Mukthar (id=1) has 3 conversations
INSERT INTO conversations (user_id, title) VALUES
    (1, 'Morning Workout Plan'),
    (1, 'Healthy Meal Ideas'),
    (1, 'Sleep Improvement Tips');

-- Alice (id=2) has 2 conversations
INSERT INTO conversations (user_id, title) VALUES
    (2, 'Hydration Tracking'),
    (2, 'Stress Management');

-- Bob (id=3) has NO conversations — useful for LEFT JOIN demo
-- (Bob exists in users but has no rows in conversations)
