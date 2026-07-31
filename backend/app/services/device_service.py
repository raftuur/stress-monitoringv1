from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.device import Device
from app.repositories.device_repository import DeviceRepository
from app.schemas.device import DeviceCreate, DeviceUpdate


class DeviceService:

    def __init__(self, db: Session):
        self.repo = DeviceRepository(db)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, device_id: int):
        device = self.repo.get_by_id(device_id)

        if device is None:
            raise HTTPException(404, "Device not found")

        return device

    def create(self, request: DeviceCreate):

        if self.repo.get_by_code(request.device_code):
            raise HTTPException(400, "Device code already exists")

        device = Device(
            device_code=request.device_code,
            device_name=request.device_name,
            location=request.location,
        )

        return self.repo.create(device)

    def update(self, device_id: int, request: DeviceUpdate):
        device = self.get_by_id(device_id)

        device.device_name = request.device_name
        device.location = request.location
        device.status = request.status

        self.repo.update()

        return device

    def delete(self, device_id: int):
        device = self.get_by_id(device_id)

        self.repo.delete(device)

        return {
            "message": "Device deleted successfully"
        }