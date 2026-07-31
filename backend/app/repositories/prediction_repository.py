from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.prediction import Prediction


class PredictionRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, prediction: Prediction):
        self.db.add(prediction)
        self.db.commit()
        self.db.refresh(prediction)
        return prediction

    def get_by_session(self, session_id: int):
        return self.db.scalars(
            select(Prediction)
            .where(Prediction.session_id == session_id)
            .order_by(Prediction.predicted_at.desc())
        ).all()

    def get_latest(self, session_id: int):
        return self.db.scalar(
            select(Prediction)
            .where(Prediction.session_id == session_id)
            .order_by(Prediction.predicted_at.desc())
        )