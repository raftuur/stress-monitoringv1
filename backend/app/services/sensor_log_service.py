from sqlalchemy.orm import Session

from app.models.sensor_log import SensorLog
from app.repositories.sensor_log_repository import SensorLogRepository
from app.schemas.sensor_log import SensorLogCreate


class SensorLogService:

    def __init__(self, db: Session):
        self.repo = SensorLogRepository(db)

    def create(self, request: SensorLogCreate):

        sensor_log = SensorLog(
            session_id=request.session_id,
            heart_rate=request.heart_rate,
            hrv=request.hrv,
            gsr=request.gsr,
            temperature=request.temperature,
        )

        return self.repo.create(sensor_log)

    def get_by_session(self, session_id: int):
        return self.repo.get_by_session(session_id)