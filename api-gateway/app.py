from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

AUTH_SERVICE_URL = "http://auth-service:5002" 
ROOMS_SERVICE_URL = "http://rooms-service:5003"

@app.route('/')
def hello():
    return "Hello API!"

# ================== auth service ================== 
@app.route('/auth/', methods=['GET'])
def auth_status():
    try:
        response = requests.get(f"{AUTH_SERVICE_URL}/")
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Auth service is unavailable", "details": str(e)}), 500
@app.route('/auth/add-user/', methods=['POST'])
def add_auth_user():
    try:
        user_data = request.get_json()
        
        response = requests.post(f"{AUTH_SERVICE_URL}/add-user", json=user_data)

        print("Auth service response:", response.text)

        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Auth service failed to add user", "details": str(e)}), 500

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

@app.route('/rooms/add-room/', methods=['POST'])
def add_room():
    try:
        room_data = request.get_json()
        
        response = requests.post(f"{ROOMS_SERVICE_URL}/add-room", json=room_data)

        print("Room service response:", response.text)

        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Room service failed to add room", "details": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
