from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DeviceCreate(BaseModel):
    device_code: str
    device_name: str
    location: str


class DeviceUpdate(BaseModel):
    device_name: str
    location: str
    status: bool


class DeviceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    device_code: str
    device_name: str
    location: str
    status: bool
    created_at: datetime
    updated_at: datetime