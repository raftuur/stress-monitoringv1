from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class SensorLog(Base):
    __tablename__ = "sensor_logs"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    session_id: Mapped[int] = mapped_column(
        ForeignKey("machine_sessions.id"),
        nullable=False,
    )

    heart_rate: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    hrv: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    gsr: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    temperature: Mapped[float] = mapped_column(
        Float,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    session = relationship(
        "MachineSession",
        back_populates="sensor_logs",
    )