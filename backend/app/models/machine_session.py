from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class MachineSession(Base):
    __tablename__ = "machine_sessions"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    respondent_id: Mapped[int] = mapped_column(
        ForeignKey("respondents.id"),
    )

    device_id: Mapped[int] = mapped_column(
        ForeignKey("devices.id"),
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="ACTIVE",
    )

    started_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    ended_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=True,
    )

    # Relasi ke Respondent
    respondent = relationship(
        "Respondent",
        back_populates="sessions",
    )

    # Relasi ke Device
    device = relationship(
        "Device",
        back_populates="sessions",
    )

    # ============ TAMBAHAN RELASI DI SINI ============
    sensor_logs = relationship(
        "SensorLog",
        back_populates="session",
        cascade="all, delete-orphan",
    )

    predictions = relationship(
        "Prediction",
        back_populates="session",
        cascade="all, delete-orphan",
    )
    # ================================================

predictions = relationship(
    "Prediction",
    back_populates="session",
    cascade="all, delete-orphan",
)