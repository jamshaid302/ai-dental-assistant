# 🦷 AI Dental Assistant – Frontend

React-based frontend for the dental assistant platform.

---

## 🚀 Tech Stack

- React 18 + TypeScript
- Ant Design
- React Router
- Axios
- React Query

---

## 📦 Project Setup

### 1️⃣ Install dependencies

```bash
cd frontend
npm install

```

### 2️⃣ Setup Environment Variables

```bash
VITE_API_URL=http://localhost:{PORT}

```

### 3️⃣ Run the Development Server

```bash
npm run dev

```

- The frontend will run at:

  - http://localhost:5173

🔧 Features

- Login and signup

- Dashboard to manage patients (CRUD)

- Chat with AI dental assistant (calls AI service)

- Pagination on patient table

- Modal forms for adding/updating patients

🤖 AI Usage

- AI was used to assist in:

  - Structuring components and forms
  - Ant Design integration

---

# 🦷 AI Dental Assistant – Backend

Node.js + Express backend with Prisma ORM and PostgreSQL database.

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

### 1️⃣ Install dependencies

```bash
cd backend
npm install

```

### 2️⃣ Setup Environment Variables

Create a .env file in backend/:

```bash

PORT=5000
DATABASE_URL=postgresql://postgres:{PASSWORD}@localhost:5432/{DB_NAME}
JWT_SECRET=supersecret
AI_SERVICE_URL=http://localhost:{PORT}

```

### 3️⃣ Run Prisma Migrations

```bash

npx prisma migrate dev

```

### 4️⃣ Start Backend Server

```bash
npm run dev

```

Server will run at:

- http://localhost:5000

🔧 API Endpoints

- Authentication

  - POST /auth/register Signup new user
  - POST /auth/login Login user

- Method Endpoint Description

  - Patients
  - Method Endpoint Description
  - GET /patients?page=1 List patients
  - POST /patients Create patient
  - PUT /patients/:id Update patient
  - DELETE /patients/:id Delete patient

Pagination: ?page=1&limit=5 (default: page 1, 5 items per page)

🤖 AI Usage

- AI was used to assist in:

  - Structuring controllers and Prisma queries
  - Implementing pagination

# 📁 AI SERVICE

# 🦷 AI Dental Assistant – AI Microservice

FastAPI-based microservice that integrates OpenAI for generating dental responses.

## 🚀 Tech Stack

- Python 3.13+
- FastAPI
- Uvicorn
- OpenAI SDK
- python-dotenv

---

## 📦 Project Setup

---

### 1️⃣ Create Virtual Environment

```bash
cd ai-service
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

````

### 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt

```

### 3️⃣ Setup Environment Variables

```bash
OPENAI_API_KEY=your_openai_key_here

```

### 4️⃣ Run the Server

```bash
uvicorn src.main:app --reload --port 8000

```

Server will run at:

- http://localhost:8000

🔧 API Endpoints

- AI Chat

  - Method Endpoint Description
  - POST /generate Generate AI dental assistant reply

Example Request:

{
"message": "What should I do for tooth pain?"
}

Example Response:

{
"reply": "Mock AI response: Thank you for your dental question."
}

🤖 AI Usage

- AI was used to:

  - Implement OpenAI chat integration

  - Generate code suggestions for FastAPI endpoints
````
