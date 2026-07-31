from sqlalchemy.orm import Session

from app.models.respondent import Respondent
from app.repositories.respondent_repository import RespondentRepository
from app.schemas.respondent import RespondentCreate


class RespondentService:

    def __init__(self, db: Session):
        self.repo = RespondentRepository(db)

    def get_all(
        self,
        page: int,
        limit: int,
        search: str | None = None,
    ):
        return self.repo.get_all(
            page,
            limit,
            search,
        )

    def create(self, request: RespondentCreate):
        last = self.repo.get_last()

        if last is None:
            code = "RSP-0001"
        else:
            number = int(last.respondent_code.split("-")[1])
            code = f"RSP-{number+1:04d}"

        respondent = Respondent(
            respondent_code=code,
            full_name=request.full_name,
            gender=request.gender,
            age=request.age,
            occupation=request.occupation,
        )

        return self.repo.create(respondent)