from flask import Flask, request, jsonify
from models import db
from models.user import User
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)


@app.route('/', methods=['GET'])
def auth():
    return jsonify({"message": "Hello from Auth Service!"})


@app.route('/add-user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()

        if not all(k in data for k in ("firstName", "lastName", "email", "password", "role")):
            return jsonify({"error": "Missing required fields"}), 400

        new_user = User(
            firstName=data['firstName'],
            lastName=data['lastName'],
            email=data['email'],
            password=data['password'],
            role=data['role']
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User added successfully"}), 201

    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": "Failed to add user", "details": str(e)}), 500
        
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
