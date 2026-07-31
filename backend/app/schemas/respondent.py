from datetime import datetime

from pydantic import BaseModel, ConfigDict


class RespondentCreate(BaseModel):
    full_name: str
    gender: str
    age: int
    occupation: str


class RespondentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    respondent_code: str
    full_name: str
    gender: str
    age: int
    occupation: str
    created_at: datetime
    updated_at: datetime


# TAMBAHKAN INI
class RespondentPaginationResponse(BaseModel):
    items: list[RespondentResponse]
    total: int
    page: int
    limit: int