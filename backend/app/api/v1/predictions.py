from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.prediction import (
    PredictionCreate,
    PredictionResponse,
)
from app.services.prediction_service import PredictionService

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"],
)


@router.post(
    "",
    response_model=PredictionResponse,
)
def create_prediction(
    request: PredictionCreate,
    db: Session = Depends(get_db),
):
    return PredictionService(db).create(request)


@router.get(
    "/session/{session_id}",
    response_model=List[PredictionResponse],
)
def get_predictions(
    session_id: int,
    db: Session = Depends(get_db),
):
    return PredictionService(db).get_by_session(session_id)


@router.get(
    "/latest/{session_id}",
    response_model=PredictionResponse,
)
def latest_prediction(
    session_id: int,
    db: Session = Depends(get_db),
):
    return PredictionService(db).get_latest(session_id)