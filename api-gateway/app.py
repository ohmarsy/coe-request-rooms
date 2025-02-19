from flask import Flask, jsonify
import requests

app = Flask(__name__)

AUTH_SERVICE_URL = "http://localhost:5002"  
DASHBOARD_SERVICE_URL = "http://localhost:5003"  

@app.route('/auth/', methods=['GET'])
def auth():
    try:
        response = requests.get(f"{AUTH_SERVICE_URL}/")
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Auth service is unavailable", "details": str(e)}), 500

@app.route('/dashboard/', methods=['GET'])
def dashboard():
    try:
        response = requests.get(f"{DASHBOARD_SERVICE_URL}/")
        
        if response.status_code == 200:
            try:
                return jsonify(response.json()), response.status_code
            except ValueError:
                return jsonify({"error": "Invalid JSON response from Dashboard Service"}), 500
        
        return jsonify({"error": "Dashboard service returned an error", "status": response.status_code}), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Dashboard service is unavailable", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
