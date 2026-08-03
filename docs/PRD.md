# Product Requirements Document (PRD)

# Zenugo AI

Version: 1.0

Author: Mukthar M J

---

# 1. Overview

Zenugo AI is a full-stack AI-powered health and wellness platform that provides users with personalized wellness guidance through natural conversations. The application allows users to securely create accounts, chat with an AI wellness assistant, and access their previous conversations from any device.

The goal of the project is to demonstrate the implementation of a modern MERN application integrated with Large Language Models (LLMs), authentication, cloud deployment, and database management.

---

# 2. Problem Statement

Many people struggle to find reliable, personalized health and wellness guidance. Most available resources are generic and not conversational.

Zenugo AI addresses this by providing an AI-powered assistant capable of answering wellness-related questions in a simple chat interface while maintaining user conversation history.

---

# 3. Objectives

- Provide personalized AI-powered wellness conversations.
- Allow users to securely create and manage accounts.
- Maintain conversation history across sessions.
- Deliver a responsive user experience across desktop and mobile.
- Demonstrate production-ready full-stack application development.

---

# 4. Target Users

- Students
- Working professionals
- Fitness enthusiasts
- Anyone seeking general wellness guidance

---

# 5. User Stories

As a new user,
I want to create an account
So that my conversations are saved securely.

As a returning user,
I want to log in
So I can continue previous conversations.

As a user,
I want to ask health and wellness questions
So I receive AI-generated guidance.

As a user,
I want to view previous chats
So I can continue older conversations.

---

# 6. Functional Requirements

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

## AI Chat

- Send prompts to AI
- Receive AI-generated responses
- Save conversation history
- Continue previous conversations

## Chat History

- View all previous chats
- Open existing conversations
- Continue conversations

## User Interface

- Responsive layout
- Modern landing page
- Clean chat interface
- Sidebar for conversation history

---

# 7. Non-Functional Requirements

- Responsive design
- Secure authentication
- Fast API response
- Scalable backend architecture
- Environment variable protection
- Production deployment

---

# 8. Technology Stack

## Frontend

- React
- Vite
- JavaScript
- CSS

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## AI

- OpenRouter API

## Authentication

- JWT

## Deployment

- Vercel
- Render

---

# 9. Success Criteria

The project is considered successful if users can:

- Register and log in successfully.
- Chat with the AI assistant.
- View previous conversations.
- Receive AI-generated responses.
- Access the application on desktop and mobile devices.
- Use the deployed application without setup.

---

# 10. Future Enhancements

- Voice input
- Image-based health assistance
- Personalized wellness recommendations
- Multi-language support
- Health progress tracking
- AI memory improvements
- Streaming AI responses

---

# 11. Assumptions

- Users have internet connectivity.
- OpenRouter API is available.
- MongoDB Atlas is operational.
- Users understand that responses are informational and not medical advice.

---

# 12. Constraints

- AI responses depend on external API availability.
- API rate limits may affect response times.
- The application is intended for wellness guidance only and should not replace professional medical advice.

---

# End of Document