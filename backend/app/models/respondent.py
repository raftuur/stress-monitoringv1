from datetime import datetime

from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship  # <-- TAMBAHAN import relationship

from app.database.base import Base


class Respondent(Base):
    __tablename__ = "respondents"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    respondent_code: Mapped[str] = mapped_column(
        String(20),
        unique=True,
    )

    full_name: Mapped[str] = mapped_column(
        String(150),
    )

    gender: Mapped[str] = mapped_column(
        String(20),
    )

    age: Mapped[int] = mapped_column(
        Integer,
    )

    occupation: Mapped[str] = mapped_column(
        String(100),
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    # ============ TAMBAHAN RELASI DI SINI ============
    sessions = relationship(
        "MachineSession",
        back_populates="respondent",
    )
    # ================================================