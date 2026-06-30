<div align="center">

# Zenugo AI

**Your intelligent, AI-powered health and wellness companion.**

Zenugo AI is a modern web application designed to provide personalized, concise, and actionable wellness, fitness, hydration, sleep, nutrition, and lifestyle advice through an intuitive chat interface with chat memory for better experience.

[**Live Demo →**](https://zenugo-ai.vercel.app)

<a href="https://vercel.com"><img src="https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat&logo=vercel&logoColor=white" alt="Deployed on Vercel" height="24" /></a>

<br />

<img src="docs/images/hero.png" alt="Zenugo AI Hero Preview" width="100%" />

</div>

<br />

## Why Zenugo AI?

In an era of information overload, finding clear, actionable health and wellness advice can be overwhelming. Zenugo AI was built with a singular vision: to strip away the noise and provide individuals with a calm, focused, and deeply intelligent wellness companion. It is not designed to replace medical professionals, but rather to serve as a supportive guide for daily habits—ranging from hydration tracking and sleep optimization to mindful lifestyle changes. The platform emphasizes a frictionless user experience, ensuring that seeking advice feels like a natural conversation rather than a tedious search.

<br />

## ✨ Features

**AI Conversations**
- **Intelligent Wellness Guidance** — Powered by advanced language models to deliver concise, practical advice on fitness, nutrition, and lifestyle.
- **Context-Aware Responses** — The AI retains conversation history to provide relevant and continuous assistance.
- **Dynamic Chat Titles** — Automatically generates smart, summarized titles for new conversations based on your initial prompt.

**Authentication**
- **Secure Access** — Robust user registration and login flows.
- **JWT Sessions** — Stateless, secure session management using JSON Web Tokens.
- **Protected Routes** — Strict client-side and server-side route protection ensuring data privacy.

**Conversation History**
- **Persistent Chats** — All conversations are securely stored and easily retrievable.
- **Management** — Users can seamlessly switch between past conversations, rename them, or delete them when no longer needed.

**Modern Interface**
- **Premium Aesthetics** — Clean, minimalist design system utilizing Framer Motion for subtle, elegant micro-interactions.
- **Intuitive Layout** — Carefully crafted user journeys from the landing page to the core chat interface.

**Responsive Experience**
- **Mobile-First Design** — Fully responsive layout that adapts gracefully to any device, ensuring a seamless experience on desktop, tablet, and mobile.
- **Fluid Typography & Layouts** — Vanilla CSS executed with precision for maximum performance and visual harmony.

**Security**
- **Data Protection** — Passwords are cryptographically hashed, and sensitive routes are guarded by comprehensive middleware.

<br />

## 📸 Screenshots

| Landing Page | Authentication |
| :---: | :---: |
| <img src="docs/images/landing.png" alt="Landing Page" width="100%" /> | <img src="docs/images/register.png" alt="Authentication" width="100%" /> |

| Chat Interface |
| :---: |
| <img src="docs/images/chat.png" alt="Chat" width="100%" /> |

<br />

## 🏗 Architecture

Zenugo AI employs a modern, decoupled architecture designed for scale and responsiveness. The client application handles UI state and routing independently, communicating with the backend via a secure RESTful API.

```mermaid
graph TD
    Client[React Client] -->|HTTPS Requests| API[Express API]
    API -->|Validates| JWT[JWT Authentication]
    JWT -->|Authenticated| Controllers[Business Logic]
    Controllers <-->|Mongoose ODM| DB[(MongoDB Atlas)]
    Controllers <-->|REST API| AI[OpenRouter AI]
    
    classDef client fill:#61DAFB,stroke:#000,stroke-width:2px,color:#000;
    classDef server fill:#83CD29,stroke:#000,stroke-width:2px,color:#000;
    classDef auth fill:#F05032,stroke:#000,stroke-width:2px,color:#fff;
    classDef database fill:#47A248,stroke:#000,stroke-width:2px,color:#fff;
    classDef external fill:#FF5A5F,stroke:#000,stroke-width:2px,color:#fff;

    class Client client;
    class API,Controllers server;
    class JWT auth;
    class DB database;
    class AI external;
```

<br />

## 🛠 Technology Stack

| | |
| :--- | :--- |
| **Frontend** | React 19 · React Router DOM · Framer Motion · Lucide React |
| **Backend** | Node.js · Express.js 5 |
| **Database** | MongoDB Atlas · Mongoose ODM |
| **Auth** | JWT · Bcrypt · Cookie Parser |
| **AI** | OpenRouter · DeepSeek Models |
| **Deploy** | Vercel (Frontend) · Render (Backend) |
| **Styling** | Vanilla CSS |
| **Tooling** | Vite |

<br />

## 📂 Project Structure

```
zenugo-ai/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   └── src/
│       ├── assets/             # Images and icons
│       ├── components/         # Reusable UI components (Navbar, Footer, Routes)
│       ├── context/            # React context providers (AuthContext)
│       ├── pages/              # Main route views (Home, Chat, Login, etc.)
│       └── services/           # API integration and external calls
├── server/                     # Backend Express application
│   ├── config/                 # Database and environment configurations
│   ├── controllers/            # Core business logic (Auth, Chat)
│   ├── middleware/             # Request interceptors (Auth verification)
│   ├── models/                 # Mongoose schemas (User, Message, Conversation)
│   └── routes/                 # Express route definitions
├── package.json                # Root workspace configuration
└── vercel.json                 # Deployment configuration
```

<br />

## 🚀 Production Deployment

Zenugo AI is deployed using a distributed architecture to ensure optimal performance and uptime:

| Service | Platform | Role |
| :--- | :--- | :--- |
| **Frontend** | Vercel | Static build via Vite, served on Vercel's edge network for ultra-fast load times |
| **Backend** | Render | Node.js Express runtime for business logic, auth, and API requests |
| **Database** | MongoDB Atlas | Fully managed cluster with high availability and automated backups |
| **AI** | OpenRouter | High-performance API for intelligent response generation |

The frontend securely communicates with the backend over HTTPS, safely transmitting authentication state without exposing tokens to client-side scripts.

<br />

## 🔒 Security

Security is a foundational element of the Zenugo AI architecture:

- **JWT (JSON Web Tokens)** — Used for stateless, tamper-proof user authentication.
- **Password Hashing** — Utilizing `bcrypt` to ensure user credentials are cryptographically secure.
- **Protected Routes** — Both client-side wrappers and server-side middleware strictly enforce authentication requirements before granting access to sensitive resources.
- **Authorization** — Database queries are strictly scoped to the authenticated user ID (`req.user.userId`), ensuring users can only access their own conversations and messages.
- **Environment Variables** — All secrets, database URIs, and API keys are securely managed via environment variables and never committed to source control.

<br />

## 🗺 Roadmap

- [ ] **Advanced Context Windowing** — Sliding context windows for endlessly long conversations without hitting token limits.
- [ ] **Personalized Health Profiles** — Baseline metrics (age, fitness goals, dietary restrictions) to tailor AI responses.
- [ ] **Voice Integration** — Speech-to-text input and text-to-speech output for hands-free conversations.
- [ ] **Data Export** — Export conversation histories and wellness plans.

<br />

## 👨‍💻 Author

**Mukthar M J**

- GitHub: [https://github.com/MuktharMJ](https://github.com/MuktharMJ)
- LinkedIn: [https://www.linkedin.com/in/mukthar-m-j-/](https://www.linkedin.com/in/mukthar-m-j-/)
- Portfolio: *Coming Soon*

<br />

## 📄 License

This software is proprietary.

Copyright © 2026 Mukthar M J. All Rights Reserved.

Viewing the source code does not grant permission to copy, modify, redistribute, or reuse any part of this project without explicit written permission from the author.
