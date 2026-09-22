-- ==============================================================
-- CONCEPT: Relational Schema Design with PK/FK
-- ==============================================================
-- This schema models the Zenugo AI user-conversation relationship
-- using a relational (PostgreSQL) database.
--
-- It demonstrates:
--   - PRIMARY KEY: Unique identifier for each row
--   - FOREIGN KEY: Referential integrity between tables
--   - REFERENCES: Links conversations.user_id → users.id
--   - NOT NULL: Required fields
--   - UNIQUE: Prevents duplicate emails
--   - One-to-Many: One user can have many conversations
--
-- This is a SUPPLEMENTARY relational model alongside the existing
-- MongoDB/Mongoose production database. It does NOT replace MongoDB.
-- ==============================================================

-- Drop existing tables (for clean re-runs)
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ──────────────────────────────────────────────
-- USERS table
-- ──────────────────────────────────────────────
-- Each user has a unique auto-incrementing id (PRIMARY KEY)
-- and a unique email address (UNIQUE constraint).

CREATE TABLE users (
    id       SERIAL       PRIMARY KEY,          -- Auto-incrementing primary key
    name     VARCHAR(100) NOT NULL,              -- User's display name
    email    VARCHAR(150) UNIQUE NOT NULL,       -- Unique email constraint
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

-- ──────────────────────────────────────────────
-- CONVERSATIONS table
-- ──────────────────────────────────────────────
-- Each conversation belongs to exactly one user.
-- The user_id column is a FOREIGN KEY that REFERENCES users(id).
-- This enforces referential integrity: you cannot create a
-- conversation for a user that does not exist.
-- ON DELETE CASCADE means deleting a user deletes their conversations.

CREATE TABLE conversations (
    id       SERIAL       PRIMARY KEY,                          -- Auto-incrementing primary key
    user_id  INTEGER      NOT NULL REFERENCES users(id)        -- Foreign key → users.id
                          ON DELETE CASCADE,
    title    VARCHAR(200) NOT NULL,                             -- Conversation title
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

-- Relationship: users (1) ──→ (many) conversations
-- One user can have many conversations.
-- Each conversation belongs to exactly one user.
