from fastapi import APIRouter
from pydantic import BaseModel
from app.services.summarization_service import summarize_text

router = APIRouter(
    tags=["Summarization"]
)

class TextInput(BaseModel):
    text: str
    summary_type: str = "short"

@router.post("/summarize")
def summarize(data: TextInput):   
    return summarize_text(data.text, data.summary_type)