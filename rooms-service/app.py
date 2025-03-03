from flask import Flask, request, jsonify
from models import db
from models.room import Room
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL') or 'postgresql://postgres:password@localhost:5433/roomdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/', methods=['GET'])
def rooms():
    return jsonify({"message": "Hello from Rooms Service!"})

@app.route('/add-room', methods=['POST'])
def add_room():
    try:
        data = request.get_json()

        if not all(k in data for k in ["room_id"]):
            return jsonify({"error": "Missing required fields"}), 400

        new_room = Room(
            room_id=data['room_id']
        )

        db.session.add(new_room)
        db.session.commit()

        return jsonify({"message": "Room added successfully"}), 201

    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": "Failed to add room", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)
