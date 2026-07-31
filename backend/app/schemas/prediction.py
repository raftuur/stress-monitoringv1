from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PredictionCreate(BaseModel):
    session_id: int
    stress_level: str
    confidence: float
    model_name: str
    model_version: str


class PredictionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    session_id: int
    stress_level: str
    confidence: float
    model_name: str
    model_version: str
    predicted_at: datetime