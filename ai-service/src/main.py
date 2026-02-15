from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Dental Assistant API!"}

@app.post("/generate")
async def generate(request: ChatRequest):
    api_key = os.getenv("OPENAI_API_KEY")

    print(f"api key: {api_key}")

    if not api_key:
        return {"reply": "Mock AI response: Thank you for your dental question."}

    client = OpenAI(api_key=api_key)

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful dental assistant."},
                {"role": "user", "content": request.message}
            ]
        )
        
        return {"reply": completion.choices[0].message.content}

    except Exception:
        return {
            "reply": "Mock AI response: AI service temporarily unavailable."
        }
