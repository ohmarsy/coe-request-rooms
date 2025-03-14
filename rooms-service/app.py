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

load_dotenv()

app = Flask(__name__)
app.url_map.strict_slashes = False

CORS(app)
baseUrl = os.getenv('BASE_URL', 'localhost')

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', f'postgresql://postgres:password@{baseUrl}:5433/roomdb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)


AUTH_SERVICE_URL = f"http://{baseUrl}:5002" 

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
    

@app.route('/all-rooms', methods=['GET'])
def get_rooms():
    try:
        rooms = Room.query.all()
        return jsonify([room.to_dict() for room in rooms])
    
    except Exception as e: 
        return jsonify({"error": "Room service is unavailable", "details": str(e)}), 500

@app.route('/access-list', methods=['POST'])
def add_access_list():
    try:
        data = request.get_json()

        required_fields = ["rooms", "date", "checkin", "checkout", "user_id"]
        if not all(k in data for k in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        if not isinstance(data['rooms'], list) or len(data['rooms']) == 0:
            return jsonify({"error": "Room must be a non-empty array"}), 400
        
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Missing Authorization Token"}), 401

        user_response = requests.get(f"{AUTH_SERVICE_URL}/user/{data['user_id']}", headers={"Authorization": token})
        if user_response.status_code != 200:
            return jsonify({"error": "User not found"}), 404

        try:
            date_obj = datetime.strptime(data['date'], "%Y-%m-%d").date()
            
            checkin_str = data['checkin']
            if len(checkin_str.split(':')) == 2:
                checkin_str += ":00"
            checkin_time = datetime.strptime(checkin_str, "%H:%M:%S").time()
            
            checkout_str = data['checkout']
            if len(checkout_str.split(':')) == 2:
                checkout_str += ":00"
            checkout_time = datetime.strptime(checkout_str, "%H:%M:%S").time()
            
        except ValueError as e:
            return jsonify({"error": f"Invalid date or time format: {str(e)}"}), 400
     
        added_rooms = []
        failed_rooms = []
        
        for room_id in data['rooms']:
            try:
                room = Room.query.filter_by(room_id=room_id).first()
                if not room:
                    failed_rooms.append({"room_id": room_id, "reason": "Room not found"})
                    continue
                
                new_access_list = AccessList(
                    room_id=room_id,
                    date=date_obj,
                    checkin=checkin_time,
                    checkout=checkout_time,
                    approved="pending",
                    user_id=data['user_id']
                )

                db.session.add(new_access_list)
                added_rooms.append(room_id)
            except Exception as e:
                failed_rooms.append({"room_id": room_id, "reason": str(e)})
        
        if not added_rooms:
            db.session.rollback()
            return jsonify({"error": "No rooms were added", "failed_rooms": failed_rooms}), 400

        db.session.commit()
        
        result = {
            "message": "Room access requests added successfully", 
            "added_rooms": added_rooms
        }
        
        if failed_rooms:
            result["failed_rooms"] = failed_rooms
            
        return jsonify(result), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/access-list/approve/<string:id>', methods=['PUT'])
def update_access_list_approval(id):
    try:
        data = request.get_json()

        if 'approved' not in data:
            return jsonify({"error": "Missing required field: approved"}), 400
        

        access_entry = AccessList.query.get(id)

        if not access_entry:
            return jsonify({"error": f"No access entry found with id {id}"}), 404

        access_entry.approved = data['approved']
        db.session.commit()

        return jsonify({
            "message": "Access list approval updated successfully",
            "id": id,
            "approved": data['approved']
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route('/access-list/delete/<int:id>', methods=['DELETE'])
def delete_access_list_approval(id):
    try:
        access_entry = AccessList.query.get(id)

        if not access_entry:
            return jsonify({"error": f"No access entry found with id {id}"}), 404

        db.session.delete(access_entry)
        db.session.commit()

        return jsonify({
            "message": f"Access entry with id {id} deleted successfully"
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



@app.route('/access-list/all', methods=['GET'])
def get_all_access_lists():
    try:
        access_list = AccessList.query.all()
        result = []
        
        for access in access_list:
            user_response = requests.get(f"{AUTH_SERVICE_URL}/user/{access.user_id}")
            user_info = {}
            if user_response.status_code == 200:
                user_data = user_response.json()
                user_info = {
                    "first_name": user_data.get("first_name", ""),
                    "last_name": user_data.get("last_name", "")
                }
                
            full_name = f"{user_info.get('first_name', '')} {user_info.get('last_name', '')}".strip()

            result.append({
                "id": access.id,
                "room_id": access.room_id,
                "date": access.date.strftime('%Y-%m-%d'),  
                "checkin": str(access.checkin),
                "checkout": str(access.checkout),
                "approved": access.approved,
                "user_id": access.user_id,
                "name": full_name
            })
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/access-list/user/<int:user_id>', methods=['GET'])
def get_access_lists_by_user(user_id):
    try:
        access_lists = AccessList.query.filter_by(user_id=user_id)\
            .order_by(AccessList.date.desc(), AccessList.checkin.desc())\
            .all()       
        
        if not access_lists:
            return jsonify([]) 
        
        result = [
            {
                "id": access.id,
                "room_id": access.room_id,
                "date": access.date.strftime('%Y-%m-%d'),
                "checkin": str(access.checkin),
                "checkout": str(access.checkout),  # Fix: should be checkout, not checkin
                "approved": access.approved,
                "user_id": access.user_id
            }
            for access in access_lists
        ]
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/access-list/room/<string:room_id>', methods=['GET'])
def get_access_lists_by_room(room_id):
    try:
        access_lists = AccessList.query.filter_by(room_id=room_id).all()
        
        if not access_lists:
            return jsonify([]) 
        
        
        result = [
            {
                "id": access.id,
                "room_id": access.room_id,
                "date": access.date.strftime('%Y-%m-%d'),
                "checkin": str(access.checkin),
                "checkout": str(access.checkout),  # Fix: should be checkout, not checkin
                "approved": access.approved,
                "user_id": access.user_id
            }
            for access in access_lists
        ]
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@app.route('/images', methods=['GET'])
def get_images():
    mock_data = [
        {"id": 1, "image": "https://picsum.photos/id/237/200/300", "name": "Image 1 description", "email": "a@a.com","timestamps": 1741361900},
        {"id": 2, "image": "https://picsum.photos/seed/picsum/200/300", "name": "Image 2 description", "email": "b@b.com","timestamps": 1741945737},
        {"id": 3, "image": "https://picsum.photos/200/300?grayscale", "name": "Image 3 description", "email": "c@c.com","timestamps": 795114003}
    ]
    
    return jsonify(mock_data)

# @app.route('/temperature-indoor', methods=['GET'])
# def get_temp_indoor():
#     mock_data = [
#         {"id": 1, "indoor": 24},
#     ]
    
#     return jsonify(mock_data)

# @app.route('/temperature-outdoor', methods=['GET'])
# def get_temp_outdoor():
#     mock_data = [
#         {"id": 1, "outdoor": 38},
#     ]
    
#     return jsonify(mock_data)

# @app.route('/people', methods=['GET'])
# def get_people():
#     mock_data = [
#     {"totalMovements": 10, "maxTimestamp": "1741361899"}
#     ]
    
#     return jsonify(mock_data)

# @app.route('/report-table', methods=['GET'])
# def get_report_table():
#     mock_data = [
#         { "room": "EN4102", "status": "Occupied", "information": "35.8", "device": "AN-3351-3", "time": "16:45", "date": "12-02-2025" },
#         { "room": "EM5103", "status": "Occupied", "information": "User_image", "device": "CAM-32", "time": "19:35", "date": "12-02-2025" },
#         { "room": "EM5103", "status": "Occupied", "information": "User_image", "device": "CAM-32", "time": "19:35", "date": "12-02-2025" },
#         { "room": "EM5103", "status": "Occupied", "information": "User_image", "device": "CAM-32", "time": "19:35", "date": "12-02-2025" },
#         { "room": "EM5103", "status": "Occupied", "information": "User_image", "device": "CAM-32", "time": "19:35", "date": "12-02-2025" },
#         { "room": "EM5103", "status": "Occupied", "information": "User_image", "device": "CAM-32", "time": "19:35", "date": "12-02-2025" }
#     ]
#     return jsonify(mock_data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)
