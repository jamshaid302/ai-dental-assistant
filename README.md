# 🦷 AI Dental Assistant Platform

A full-stack AI-powered dental assistant platform that allows users to:

- Register & login securely
- Manage patients (CRUD with pagination)
- Chat with an AI-powered dental assistant
- Maintain a modular microservice architecture

---

# 🏗 Architecture Overview

The application follows a modular service-oriented architecture composed of three independent services:

1. **Frontend** – React SPA (TypeScript + Ant Design)
2. **Backend API** – Express.js + Prisma + PostgreSQL
3. **AI Microservice** – FastAPI + OpenAI

---

## 🔁 System Flow

User → React Frontend  
Frontend → Express Backend (JWT Protected APIs)  
Backend → PostgreSQL (via Prisma ORM)  
Backend → AI Microservice (for AI responses)  
AI Microservice → OpenAI API

---

## 🔐 Authentication Flow

- User registers/logs in via Backend
- Backend generates JWT token
- Frontend stores token
- Protected routes require JWT in Authorization header

---

## 🎯 Key Design Decisions

- Prisma ORM for type-safe database access
- Pagination handled at database query level
- AI service separated for scalability & modularity
- Environment-based configuration using dotenv
- Clean separation of responsibilities

This architecture ensures:

- Scalability
- Maintainability
- Clear service boundaries
- Independent AI scaling

---

# 🦷 FRONTEND – React Application

React-based SPA for interacting with the dental platform.

---

## 🚀 Tech Stack

- React 18 + TypeScript
- Ant Design
- React Router
- Axios
- React Query

---

## 📦 Project Setup

### 1️⃣ Install Dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Setup Environment Variables

Create a `.env` file inside `frontend/`:

```bash
VITE_API_URL=http://localhost:5000
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔧 Features

- User Signup & Login
- JWT-based authentication
- Dashboard with patient CRUD
- Pagination (`?page=1&limit=5`)
- Modal forms for add/update
- AI chat integration

---

# 🦷 BACKEND – Express API

Node.js + Express backend using Prisma ORM and PostgreSQL.

---

## 🚀 Tech Stack

- Node.js 18+
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- dotenv

---

## 📦 Project Setup

### 1️⃣ Install Dependencies

```bash
cd backend
npm install
```

### 2️⃣ Setup Environment Variables

Create `.env` inside `backend/`:

```bash
PORT=5000
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/dental_db
JWT_SECRET=supersecret
AI_SERVICE_URL=http://localhost:8000
```

### 3️⃣ Run Prisma Migration

```bash
npx prisma migrate dev
```

### 4️⃣ Start Backend Server

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

## 🔧 API Endpoints

### 🔐 Authentication

POST `/auth/register` – Register user  
POST `/auth/login` – Login user

---

### 👤 Patients

GET `/patients?page=1&limit=5` – List patients  
POST `/patients` – Create patient  
PUT `/patients/:id` – Update patient  
DELETE `/patients/:id` – Delete patient

---

# 🦷 AI SERVICE – FastAPI Microservice

FastAPI-based AI microservice that integrates OpenAI to generate dental responses.

---

## 🚀 Tech Stack

- Python 3.10+
- FastAPI
- Uvicorn
- OpenAI SDK
- python-dotenv

---

## 📦 Project Setup

### 1️⃣ Create Virtual Environment

```bash
cd ai-service
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

### 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Setup Environment Variables

Create `.env` inside `ai-service/` (or `ai-service/src/` depending on your setup):

```bash
OPENAI_API_KEY=your_openai_key_here
```

### 4️⃣ Run AI Server

```bash
uvicorn src.main:app --reload --port 8000
```

AI service runs at:

```
http://localhost:8000
```

---

## 🔧 AI Endpoint

POST `/generate`

### Example Request

```json
{
  "message": "What should I do for tooth pain?"
}
```

### Example Response

```json
{
  "reply": "You should rinse with warm salt water and consult a dentist..."
}
```

If no API key is provided, a mock response is returned.

---

# 🔑 Required Environment Variables Summary

### Frontend

- `VITE_API_URL`

### Backend

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `AI_SERVICE_URL`

### AI Service

- `OPENAI_API_KEY`

---

# 🧪 How to Run Entire System Locally

1. Start PostgreSQL
2. Run Backend (`port 5000`)
3. Run AI Service (`port 8000`)
4. Run Frontend (`port 5173`)
5. Open:

```
http://localhost:5173
```

---

# 🤖 AI Usage Disclosure

This project was developed with the assistance of AI tools:

- ChatGPT (OpenAI) was used to brainstorm architecture decisions and refine code structure.
- GitHub Copilot assisted with some boilerplate code generation.
- The AI microservice integrates OpenAI's API for generating dental assistant responses.

All architectural decisions, database schema design, authentication flow, and integration logic were reviewed and implemented with full understanding.

---

# 📌 Project Structure

```
root/
│
├── frontend/
├── backend/
├── ai-service/
└── README.md
```

---

# 📜 License

This project is for technical assessment / educational purposes.
