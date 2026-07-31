from typing import List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin
from app.database.session import get_db
from app.models.user import User
from app.schemas.respondent import (
    RespondentCreate,
    RespondentResponse,
    RespondentPaginationResponse,
)
from app.services.respondent_service import RespondentService

router = APIRouter(
    prefix="/respondents",
    tags=["Respondents"],
)


@router.get(
    "",
    response_model=RespondentPaginationResponse,
)
def get_all(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    search: str | None = None,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return RespondentService(db).get_all(
        page,
        limit,
        search,
    )


@router.post(
    "",
    response_model=RespondentResponse,
)
def create(
    request: RespondentCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return RespondentService(db).create(request)