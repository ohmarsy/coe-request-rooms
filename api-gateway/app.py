from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
app.url_map.strict_slashes = False

CORS(app)

AUTH_SERVICE_URL = "http://auth-service:5002" 
ROOMS_SERVICE_URL = "http://rooms-service:5003"

@app.route('/')
def hello():
    return "Hello API!"

# ================== auth service ================== 
@app.route('/auth', methods=['GET'])
def auth_status():
    try:
        response = requests.get(f"{AUTH_SERVICE_URL}/")
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Auth service is unavailable", "details": str(e)}), 500

@app.route('/auth/register', methods=['POST'])
def add_auth_user():
    try:
        user_data = request.get_json()
        
        response = requests.post(f"{AUTH_SERVICE_URL}/register", json=user_data)

        print("Auth service response:", response.text)

        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Auth service failed to add user", "details": str(e)}), 500

@app.route('/auth/login', methods=['POST'])
def login_auth_user():
    try:
        user_data = request.get_json()
        
        response = requests.post(f"{AUTH_SERVICE_URL}/login", json=user_data)

        print("Auth service response:", response.text)

        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Auth service failed to add user", "details": str(e)}), 500

@app.route('/auth/refresh', methods=['POST'])
def refresh_token():
    try:
        user_data = request.get_json()
        
        response = requests.post(f"{AUTH_SERVICE_URL}/login", json=user_data)

        print("Auth service response:", response.text)

        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Auth service failed to add user", "details": str(e)}), 500

@app.route('/auth/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    token = request.headers.get("Authorization")
    try:
        response = requests.get(f"{AUTH_SERVICE_URL}/user/{user_id}", headers={"Authorization": token})
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Auth service is unavailable", "details": str(e)}), 500

@app.route('/auth/protected', methods=['GET'])
def get_user_info_from_token():
    token = request.headers.get("Authorization")
    try:
        response = requests.get(f"{AUTH_SERVICE_URL}/protected", headers={"Authorization": token})
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Auth service is unavailable", "details": str(e)}), 500

# ================== rooms service ==================
@app.route('/rooms/', methods=['GET'])
def rooms():
    try:
        response = requests.get(f"{ROOMS_SERVICE_URL}/")
        
        if response.status_code == 200:
            try:
                return jsonify(response.json()), response.status_code
            except ValueError:
                return jsonify({"error": "Invalid JSON response from Rooms Service"}), 500
        
        return jsonify({"error": "Rooms service returned an error", "status": response.status_code}), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Rooms service is unavailable", "details": str(e)}), 500

@app.route('/rooms/all-rooms', methods=['GET'])
def all_rooms():
    try:
        response = requests.get(f"{ROOMS_SERVICE_URL}/all-rooms")
        
        if response.status_code == 200:
            try:
                return jsonify(response.json()), response.status_code
            except ValueError:
                return jsonify({"error": "Invalid JSON response from Rooms Service"}), 500
        
        return jsonify({"error": "Rooms service returned an error", "status": response.status_code}), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Rooms service is unavailable", "details": str(e)}), 500


@app.route('/rooms/add-room/', methods=['POST'])
def add_room():
    try:
        room_data = request.get_json()
        
        response = requests.post(f"{ROOMS_SERVICE_URL}/add-room", json=room_data)

        print("Room service response:", response.text)

        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Room service failed to add room", "details": str(e)}), 500

@app.route('/rooms/access-list/all', methods=['GET'])
def all_access_list():
    try:
        response = requests.get(f"{ROOMS_SERVICE_URL}/access-list/all")
        
        if response.status_code == 200:
            try:
                return jsonify(response.json()), response.status_code
            except ValueError:
                return jsonify({"error": "Invalid JSON response from Rooms Service"}), 500
        
        return jsonify({"error": "Rooms service returned an error", "status": response.status_code}), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Rooms service is unavailable", "details": str(e)}), 500

@app.route('/rooms/access-list/user/<int:user_id>', methods=['GET'])
def get_access_list_by_user_id(user_id):
    try:
        response = requests.get(f"{ROOMS_SERVICE_URL}/access-list/user/{user_id}")
        
        if response.status_code == 200:
            try:
                return jsonify(response.json()), response.status_code
            except ValueError:
                return jsonify({"error": "Invalid JSON response from Rooms Service"}), 500
        
        return jsonify({"error": "Rooms service returned an error", "status": response.status_code}), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Rooms service is unavailable", "details": str(e)}), 500

@app.route('/rooms/access-list/room/<string:room_id>', methods=['GET'])
def get_access_list_by_room_id(room_id):
    try:
        response = requests.get(f"{ROOMS_SERVICE_URL}/access-list/room/{room_id}")
        
        if response.status_code == 200:
            try:
                return jsonify(response.json()), response.status_code
            except ValueError:
                return jsonify({"error": "Invalid JSON response from Rooms Service"}), 500
        
        return jsonify({"error": "Rooms service returned an error", "status": response.status_code}), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Rooms service is unavailable", "details": str(e)}), 500

@app.route('/rooms/access-list/', methods=['POST'])
def add_access_list():
    token = request.headers.get("Authorization")
    try:
        access_list_data = request.get_json()
        
        response = requests.post(f"{ROOMS_SERVICE_URL}/access-list", json=access_list_data, headers={"Authorization": token})

        print("Room service response:", response.text)

        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Room service failed to add access list", "details": str(e)}), 500

@app.route('/rooms/access-list/approve/<string:id>', methods=['PUT'])
def update_access_list(id):
    try:
        access_list_data = request.get_json()

        response = requests.put(
            f"{ROOMS_SERVICE_URL}/access-list/approve/{id}", 
            json=access_list_data,
            timeout=5
        )

        try:
            response_json = response.json()
        except requests.exceptions.JSONDecodeError:
            return jsonify({"error": "Invalid response from rooms service"}), 500

        return jsonify(response_json), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to communicate with Room Service", "details": str(e)}), 500
        
@app.route('/rooms/access-list/delete/<int:id>', methods=['DELETE'])
def delete_access_list(id):
    try:
        response = requests.delete(
            f"{ROOMS_SERVICE_URL}/access-list/delete/{id}",
            timeout=5
        )

        try:
            response_json = response.json()
        except requests.exceptions.JSONDecodeError:
            return jsonify({"error": "Invalid response from rooms service"}), 500

        return jsonify(response_json), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to communicate with Room Service", "details": str(e)}), 500



    
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
