from models import db
from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String, Date, Time
from sqlalchemy.orm import relationship

class AccessList(db.Model):
    __tablename__ = "access_lists"

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, nullable=False)
    checkin = Column(Time, nullable=False)
    checkout = Column(Time, nullable=False)
    approved = Column(Enum('approved', 'rejected', 'pending', name="approval_status"), nullable=False, default='pending')
    user_id = Column(Integer, nullable=False)
    room_id = Column(String, ForeignKey("rooms.room_id"), nullable=False)
    created_at = Column(DateTime, default=db.func.current_timestamp())
    room = relationship("Room", back_populates="access_list")