# High-Level Design (HLD)

# Zenugo AI

Version: 1.0

Author: Mukthar M J

---

# 1. System Overview

Zenugo AI follows a modern three-tier architecture consisting of:

- Frontend (React)
- Backend (Node.js + Express)
- Database (MongoDB Atlas)

The backend also communicates with the OpenRouter API to generate AI-powered responses.

---

# 2. System Architecture

```
                   +----------------------+
                   |      User Browser    |
                   +----------+-----------+
                              |
                              |
                              ▼
                  +------------------------+
                  | React Frontend (Vite)  |
                  +-----------+------------+
                              |
                      HTTPS REST API
                              |
                              ▼
                +---------------------------+
                | Express.js Backend Server |
                +-----------+---------------+
                            |
             +--------------+----------------+
             |                               |
             ▼                               ▼
    MongoDB Atlas                     OpenRouter API
(User Data & Chats)               (LLM Response Generation)
```

---

# 3. Major Components

## Frontend

Responsible for:

- User Interface
- Authentication pages
- Chat interface
- Conversation history
- API communication
- Responsive layout

Technology

- React
- Vite
- Axios
- React Router

---

## Backend

Responsible for:

- Authentication
- JWT verification
- REST API endpoints
- Database operations
- AI request processing
- Error handling

Technology

- Node.js
- Express.js

---

## Database

Stores:

- User accounts
- Chat conversations
- Individual messages

Technology

- MongoDB Atlas
- Mongoose

---

## AI Service

OpenRouter acts as the AI inference layer.

Responsibilities:

- Receives prompts
- Generates AI responses
- Returns structured text output

---

# 4. Request Flow

### User Login

User

↓

React Login Page

↓

Express Authentication API

↓

MongoDB User Validation

↓

JWT Token Generated

↓

Frontend stores JWT

↓

Authenticated User

---

### AI Chat

User sends message

↓

React

↓

Express API

↓

JWT Authentication

↓

OpenRouter API

↓

AI Response

↓

Save conversation in MongoDB

↓

Return response to React

↓

Display response

---

# 5. Deployment Architecture

Frontend

↓

Vercel

Backend

↓

Render

Database

↓

MongoDB Atlas

AI

↓

OpenRouter

---

# 6. Security

- JWT Authentication
- Protected API Routes
- Environment Variables
- Password Hashing
- Secure API Communication (HTTPS)

---

# 7. External Services

| Service | Purpose |
|----------|---------|
| MongoDB Atlas | Database |
| OpenRouter | AI Response Generation |
| Vercel | Frontend Hosting |
| Render | Backend Hosting |

---

# 8. Scalability Considerations

The application separates frontend and backend services, allowing each component to scale independently.

MongoDB Atlas provides cloud database scalability while OpenRouter handles AI inference externally.

---

# 9. Future Improvements

- Streaming AI responses
- Redis caching
- Docker deployment
- Rate limiting
- Role-based authorization
- Analytics Dashboard

---

# End of Document