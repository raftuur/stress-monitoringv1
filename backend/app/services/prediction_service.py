from sqlalchemy.orm import Session

from app.models.prediction import Prediction
from app.repositories.prediction_repository import PredictionRepository
from app.schemas.prediction import PredictionCreate


class PredictionService:

    def __init__(self, db: Session):
        self.repo = PredictionRepository(db)

    def create(self, request: PredictionCreate):

        prediction = Prediction(
            session_id=request.session_id,
            stress_level=request.stress_level,
            confidence=request.confidence,
            model_name=request.model_name,
            model_version=request.model_version,
        )

        return self.repo.create(prediction)

    def get_latest(self, session_id: int):
        return self.repo.get_latest(session_id)

    def get_by_session(self, session_id: int):
        return self.repo.get_by_session(session_id)