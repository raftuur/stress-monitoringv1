from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.device import Device


class DeviceRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.scalars(select(Device)).all()

    def get_by_id(self, device_id: int):
        return self.db.get(Device, device_id)

    def get_by_code(self, code: str):
        return self.db.scalar(
            select(Device).where(Device.device_code == code)
        )

    def create(self, device: Device):
        self.db.add(device)
        self.db.commit()
        self.db.refresh(device)
        return device

    def update(self):
        self.db.commit()

    def delete(self, device: Device):
        self.db.delete(device)
        self.db.commit()