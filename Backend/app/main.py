from fastapi import FastAPI
from app.routes import summarize, compare , analytics , history
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(summarize.router , prefix="/api")
app.include_router(compare.router , prefix="/api")
# app.include_router(analytics.router)
# app.include_router(history.router)

@app.get("/")
def home():
    return{"message": "AI summarizer API running"}