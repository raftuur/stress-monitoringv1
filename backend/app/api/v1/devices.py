from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin
from app.database.session import get_db
from app.models.user import User
from app.schemas.device import (
    DeviceCreate,
    DeviceUpdate,
    DeviceResponse,
)
from app.services.device_service import DeviceService

router = APIRouter(
    prefix="/devices",
    tags=["Devices"],
)


@router.get("", response_model=List[DeviceResponse])
def get_devices(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return DeviceService(db).get_all()


@router.post("", response_model=DeviceResponse)
def create_device(
    request: DeviceCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return DeviceService(db).create(request)


@router.get("/{device_id}", response_model=DeviceResponse)
def get_device(
    device_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return DeviceService(db).get_by_id(device_id)


@router.put("/{device_id}", response_model=DeviceResponse)
def update_device(
    device_id: int,
    request: DeviceUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return DeviceService(db).update(device_id, request)


@router.delete("/{device_id}")
def delete_device(
    device_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return DeviceService(db).delete(device_id)