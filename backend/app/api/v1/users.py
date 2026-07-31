from typing import List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin
from app.database.session import get_db
from app.models.user import User
from app.schemas.user import (
    UserResponse,
    CreateUserRequest,
    UpdateUserRequest,
    UserPaginationResponse,
)
from app.services.user_service import UserService

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get(
    "",
    response_model=UserPaginationResponse,
)
def get_users(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    search: str | None = None,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return UserService(db).get_all(
        page,
        limit,
        search,
    )


@router.post(
    "",
    response_model=UserResponse,
)
def create_user(
    request: CreateUserRequest,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return UserService(db).create(request)


@router.get(
    "/{user_id}",
    response_model=UserResponse,
)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return UserService(db).get_by_id(user_id)


@router.put(
    "/{user_id}",
    response_model=UserResponse,
)
def update_user(
    user_id: int,
    request: UpdateUserRequest,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return UserService(db).update(
        user_id,
        request,
    )


@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return UserService(db).delete(user_id)