from models import db
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

class Room(db.Model):
    __tablename__ = "rooms"

    room_id = Column(String, primary_key=True)

    access_list = relationship("AccessList", back_populates="room", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'room_id': self.room_id,
        }