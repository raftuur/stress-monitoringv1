from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
)
from app.utils.response import success_response


class AuthService:

    def __init__(self, db: Session):
        self.repo = UserRepository(db)

    def register(self, request: RegisterRequest):

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

        return success_response(
            message="Register success"
        )

    def login(self, request: LoginRequest):

        user = self.repo.get_by_email(request.email)

        if not user:
            raise HTTPException(401, "Invalid credentials")

        if not verify_password(
            request.password,
            user.password,
        ):
            raise HTTPException(401, "Invalid credentials")

        token = create_access_token(
            {
                "sub": str(user.id),
                "role": user.role.value,
            }
        )

        return TokenResponse(
            access_token=token,
            token_type="Bearer",
            role=user.role,
        )