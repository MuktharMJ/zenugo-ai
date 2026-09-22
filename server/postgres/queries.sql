-- ==============================================================
-- CONCEPT: SQL JOINs
-- ==============================================================
-- These queries use the Zenugo AI relational schema (schema.sql)
-- to demonstrate INNER JOIN and LEFT JOIN.
--
-- Run after schema.sql and seed.sql have been executed.
-- ==============================================================


-- ──────────────────────────────────────────────
-- QUERY 1: INNER JOIN
-- ──────────────────────────────────────────────
-- INNER JOIN returns ONLY rows where there is a match in BOTH tables.
-- Users without conversations (e.g., Bob) are excluded from results.
-- This joins users and conversations on the foreign key relationship.

SELECT
    users.name       AS user_name,
    users.email      AS user_email,
    conversations.title AS conversation_title,
    conversations.created_at AS started_at
FROM users
INNER JOIN conversations
    ON users.id = conversations.user_id
ORDER BY users.name, conversations.created_at;

-- Expected: Returns rows for Mukthar (3 conversations) and Alice (2 conversations).
-- Bob is NOT included because he has no conversations.


-- ──────────────────────────────────────────────
-- QUERY 2: LEFT JOIN
-- ──────────────────────────────────────────────
-- LEFT JOIN returns ALL rows from the left table (users), and matching
-- rows from the right table (conversations). If there is no match,
-- the right-side columns contain NULL.
-- This is useful for finding users who have NOT started any conversations.

SELECT
    users.name       AS user_name,
    users.email      AS user_email,
    conversations.title AS conversation_title
FROM users
LEFT JOIN conversations
    ON users.id = conversations.user_id
ORDER BY users.name, conversations.title;

-- Expected: Returns all users including Bob.
-- Bob's row will have conversation_title = NULL because he has no conversations.


-- ──────────────────────────────────────────────
-- QUERY 3: LEFT JOIN — Find users with no conversations
-- ──────────────────────────────────────────────
-- By filtering WHERE conversations.id IS NULL, we find users
-- who exist but have never started a conversation.

SELECT
    users.name  AS user_name,
    users.email AS user_email
FROM users
LEFT JOIN conversations
    ON users.id = conversations.user_id
WHERE conversations.id IS NULL;

-- Expected: Returns only Bob Smith (bob@example.com).


-- ──────────────────────────────────────────────
-- QUERY 4: INNER JOIN with COUNT (aggregate)
-- ──────────────────────────────────────────────
-- Count how many conversations each active user has.

SELECT
    users.name       AS user_name,
    COUNT(conversations.id) AS total_conversations
FROM users
INNER JOIN conversations
    ON users.id = conversations.user_id
GROUP BY users.name
ORDER BY total_conversations DESC;

-- Expected:
-- Mukthar MJ  | 3
-- Alice Johnson | 2
