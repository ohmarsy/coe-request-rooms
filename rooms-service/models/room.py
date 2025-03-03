from models import db
from sqlalchemy import Column, Integer, String

class Room(db.Model):
    __tablename__ = "rooms"

    room_id = Column(String, primary_key=True)
