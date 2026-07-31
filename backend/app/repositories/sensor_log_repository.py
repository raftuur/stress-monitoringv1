from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.sensor_log import SensorLog


class SensorLogRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, sensor_log: SensorLog):
        self.db.add(sensor_log)
        self.db.commit()
        self.db.refresh(sensor_log)
        return sensor_log

    def get_by_session(self, session_id: int):
        return self.db.scalars(
            select(SensorLog)
            .where(SensorLog.session_id == session_id)
        ).all()