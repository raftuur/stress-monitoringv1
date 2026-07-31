from sqlalchemy import select, func, or_
from sqlalchemy.orm import Session

from app.models.respondent import Respondent


class RespondentRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(
        self,
        page: int,
        limit: int,
        search: str | None = None,
    ):
        query = select(Respondent)

        if search:
            query = query.where(
                or_(
                    Respondent.full_name.ilike(f"%{search}%"),
                    Respondent.respondent_code.ilike(f"%{search}%"),
                    Respondent.occupation.ilike(f"%{search}%"),
                )
            )

        total = self.db.scalar(
            select(func.count()).select_from(query.subquery())
        )

        items = self.db.scalars(
            query.offset((page - 1) * limit)
            .limit(limit)
        ).all()

        return {
            "items": items,
            "total": total,
            "page": page,
            "limit": limit,
        }

    def get_by_id(self, respondent_id: int):
        return self.db.get(
            Respondent,
            respondent_id,
        )

    def create(self, respondent: Respondent):
        self.db.add(respondent)
        self.db.commit()
        self.db.refresh(respondent)
        return respondent

    def get_last(self):
        return (
            self.db.query(Respondent)
            .order_by(Respondent.id.desc())
            .first()
        )