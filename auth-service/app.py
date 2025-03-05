from flask import Flask, request, jsonify
from models import db
from models.user import User
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/authdb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

CORS(app)

@app.route('/', methods=['GET'])
def auth():
    return jsonify({"message": "Hello from Auth Service!"})

@app.route('/user/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = User.query.get(id)
    
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    
    # Return the user data as a JSON response
    return jsonify({
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'role': user.role,
        'created_at': user.created_at
    })
    


@app.route('/add-user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()

        if not all(k in data for k in ("first_name", "last_name", "email", "password", "role")):
            return jsonify({"error": "Missing required fields"}), 400

        new_user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
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
