from datetime import datetime
from flask import Flask, request, jsonify
import requests
from models import db
from models.room import Room
from models.access_list import AccessList
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os
from flask_cors import CORS


app = Flask(__name__)

load_dotenv()


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5433/roomdb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

CORS(app)

AUTH_SERVICE_URL = "http://localhost:5002" 

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

@app.route('/access-list', methods=['POST'])
def add_access_list():
    try:
        data = request.get_json()

        required_fields = ["room_id", "from_date", "time", "approved", "user_id"]
        if not all(k in data for k in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        user_response = requests.get(f"{AUTH_SERVICE_URL}/user/{data['user_id']}")
        
        if user_response.status_code != 200:
            return jsonify({"error": "User not found"}), 404

        from_date = datetime.strptime(data['from_date'], "%Y-%m-%d %H:%M:%S")  
        time = datetime.strptime(data['time'], "%Y-%m-%d %H:%M:%S")  

        new_access_list = AccessList(
            room_id=data['room_id'],
            from_date=from_date,
            time=time,
            approved=data['approved'],
            user_id=data['user_id']
        )

        db.session.add(new_access_list)
        db.session.commit()

        return jsonify({"message": "Access list entry added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/images', methods=['GET'])
def get_images():
    mock_data = [
        {"id": 1, "image": "https://picsum.photos/id/237/200/300", "name": "Image 1 description", "email": "a@a.com"},
        {"id": 2, "image": "https://picsum.photos/seed/picsum/200/300", "name": "Image 2 description", "email": "b@b.com"},
        {"id": 3, "image": "https://picsum.photos/200/300?grayscale", "name": "Image 3 description", "email": "c@c.com"}
    ]
    
    return jsonify(mock_data)

@app.route('/temperature-indoor', methods=['GET'])
def get_temp_indoor():
    mock_data = [
        {"id": 1, "indoor": 24},
    ]
    
    return jsonify(mock_data)

@app.route('/temperature-outdoor', methods=['GET'])
def get_temp_outdoor():
    mock_data = [
        {"id": 1, "outdoor": 38},
    ]
    
    return jsonify(mock_data)

@app.route('/people', methods=['GET'])
def get_people():
    mock_data = [
        {"id": 1, "people": 10},
    ]
    
    return jsonify(mock_data)



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)
