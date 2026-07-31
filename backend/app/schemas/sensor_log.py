from datetime import datetime

from pydantic import BaseModel, ConfigDict


class SensorLogCreate(BaseModel):
    session_id: int
    heart_rate: int
    hrv: float
    gsr: float
    temperature: float | None = None


class SensorLogResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    session_id: int
    heart_rate: int
    hrv: float
    gsr: float
    temperature: float | None
    created_at: datetime