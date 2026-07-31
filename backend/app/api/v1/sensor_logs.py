from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.sensor_log import (
    SensorLogCreate,
    SensorLogResponse,
)
from app.services.sensor_log_service import SensorLogService

router = APIRouter(
    prefix="/sensor-logs",
    tags=["Sensor Logs"],
)


@router.post(
    "",
    response_model=SensorLogResponse,
)
def create_sensor_log(
    request: SensorLogCreate,
    db: Session = Depends(get_db),
):
    return SensorLogService(db).create(request)


@router.get(
    "/session/{session_id}",
    response_model=List[SensorLogResponse],
)
def get_logs(
    session_id: int,
    db: Session = Depends(get_db),
):
    return SensorLogService(db).get_by_session(session_id)