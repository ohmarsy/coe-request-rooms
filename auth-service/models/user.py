from models import db
from sqlalchemy import Column, Integer, String

class User(db.Model):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    created_at = Column(db.DateTime, default=db.func.current_timestamp())
