# Low-Level Design (LLD)

# Zenugo AI

Version: 1.0

Author: Mukthar M J

---

# 1. Introduction

This document describes the internal design of Zenugo AI, including project structure, API endpoints, database schemas, authentication flow, and request lifecycle.

---

# 2. Project Structure

```
Zenugo-AI
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── services
│   │   ├── assets
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 3. Frontend Components

### Landing Page

Displays:

- Hero section
- Features
- Navigation
- Call-to-action buttons

---

### Authentication

Handles:

- User Registration
- User Login
- JWT storage
- Session persistence

---

### Chat Interface

Responsible for:

- Sending prompts
- Displaying AI responses
- Viewing conversation history
- Starting new chats

---

### Context

Responsible for:

- User authentication state
- Current logged-in user
- Login/logout functionality

---

# 4. Backend Modules

### Routes

Authentication Routes

```
POST /auth/register

POST /auth/login

GET /auth/me

POST /auth/logout
```

Chat Routes

```
GET /chat

POST /chat

GET /chat/:id
```

---

### Controllers

Auth Controller

Responsibilities

- Register users
- Login users
- Verify JWT
- Return authenticated user

---

Chat Controller

Responsibilities

- Receive prompts
- Call OpenRouter
- Save conversations
- Return AI responses

---

### Middleware

Authentication Middleware

Responsibilities

- Verify JWT
- Protect private routes
- Identify authenticated users

---

# 5. Database Design

## User Collection

```
User

_id

name

email

password
```

---

## Conversation Collection

```
Conversation

_id

userId

title

createdAt
```

---

## Message Collection

```
Message

_id

conversationId

role

content

timestamp
```

---

# 6. Authentication Flow

```
User

↓

Login Request

↓

Express API

↓

Find User

↓

Verify Password

↓

Generate JWT

↓

Return Token

↓

Frontend stores token

↓

Authenticated Requests
```

---

# 7. Chat Flow

```
User enters prompt

↓

React

↓

Axios POST Request

↓

Express Route

↓

Authentication Middleware

↓

Chat Controller

↓

OpenRouter API

↓

Receive AI Response

↓

Save Conversation

↓

MongoDB Atlas

↓

Return Response

↓

Display Message
```

---

# 8. API Design

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /auth/register | POST | Register user |
| /auth/login | POST | Login |
| /auth/me | GET | Current user |
| /auth/logout | POST | Logout |
| /chat | GET | Fetch conversations |
| /chat | POST | Send prompt |

---

# 9. Error Handling

Frontend

- Loading state
- Error messages
- API failure handling

Backend

- Try/Catch blocks
- HTTP Status Codes
- Invalid JWT handling
- Database error handling

---

# 10. Environment Variables

Backend

```
PORT

MONGODB_URI

JWT_SECRET

OPENROUTER_API_KEY
```

Frontend

```
VITE_API_URL
```

---

# 11. Deployment

Frontend

Vercel

Backend

Render

Database

MongoDB Atlas

---

# 12. Future Enhancements

- Streaming AI responses
- Multi-language support
- Voice conversations
- AI memory improvements
- Role-based authorization
- Rate limiting
- Docker deployment

---

# End of Document