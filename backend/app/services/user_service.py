from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository
from app.models.user import User
from app.schemas.user import (
    CreateUserRequest,
    UpdateUserRequest,
)
from app.core.security import hash_password
from app.utils.response import success_response


class UserService:

    def __init__(self, db: Session):
        self.repo = UserRepository(db)

    def create(
        self,
        request: CreateUserRequest,
    ):
        if self.repo.get_by_email(request.email):
            raise HTTPException(
                status_code=400,
                detail="Email already exists",
            )

        user = User(
            name=request.name,
            email=request.email,
            password=hash_password(request.password),
            role=request.role,
        )

        self.repo.create(user)

        return user

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

    def get_by_id(self, user_id: int):
        user = self.repo.get_by_id(user_id)

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )

        return user

    def update(
        self,
        user_id: int,
        request: UpdateUserRequest,
    ):
        user = self.get_by_id(user_id)

        user.name = request.name
        user.email = request.email
        user.role = request.role
        user.status = request.status

        self.repo.db.commit()
        self.repo.db.refresh(user)

        return user

    def delete(self, user_id: int):
        user = self.get_by_id(user_id)

        self.repo.delete(user)

        return {
            "message": "User deleted successfully"
        }