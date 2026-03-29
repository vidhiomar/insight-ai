from fastapi import APIRouter
from pydantic import BaseModel
from app.services.summarization_service import compare_models

router = APIRouter(
    tags=["Comparison"]
)

class CompareInput(BaseModel):
    text: str

@router.post("/compare")
def compare(data: CompareInput):
    return compare_models(data.text)
