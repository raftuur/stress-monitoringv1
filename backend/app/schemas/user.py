from pydantic import BaseModel, EmailStr
from datetime import datetime
from pydantic import ConfigDict

from app.models.user import UserRole


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: UserRole


# ============ TAMBAHAN DI SINI ============
class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    role: UserRole
    status: bool
    created_at: datetime
    updated_at: datetime


class CreateUserRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole


class UpdateUserRequest(BaseModel):
    name: str
    email: EmailStr
    role: UserRole
    status: bool
# ==========================================

# TAMBAHKAN INI
class UserPaginationResponse(BaseModel):
    items: list[UserResponse]
    total: int
    page: int
    limit: int