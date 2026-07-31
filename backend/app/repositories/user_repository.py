from sqlalchemy import select, func, or_
from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(
        self,
        page: int,
        limit: int,
        search: str | None = None,
    ):
        query = select(User)

        if search:
            query = query.where(
                or_(
                    User.name.ilike(f"%{search}%"),
                    User.email.ilike(f"%{search}%"),
                )
            )

        total = self.db.scalar(
            select(func.count())
            .select_from(query.subquery())
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

    def get_by_id(self, user_id: int):
        return self.db.get(User, user_id)

    def get_by_email(self, email: str):
        return self.db.scalar(
            select(User).where(User.email == email)
        )

    def create(self, user: User):
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update(self):
        self.db.commit()

    def delete(self, user: User):
        self.db.delete(user)
        self.db.commit()