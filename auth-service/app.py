from flask import Flask, request, jsonify
from models import db
from models.user import User
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  
from dotenv import load_dotenv
import bcrypt
import os
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app) 

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/authdb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)
migrate = Migrate(app, db)

CORS(app)

@app.route('/', methods=['GET'])
def auth():
    return jsonify({"message": "Hello from Auth Service!"})

@app.route('/user/<int:id>/', methods=['GET'])
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
    


@app.route('/add-user/', methods=['POST'])
def add_user():
    data = request.get_json()
    
    # Extract user data
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')  # Default to 'user' if not provided
    
    # Validate required fields
    if not all([first_name, last_name, email, password, role]):
        return jsonify({"error": "All fields are required"}), 400
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 409
    
    # Hash password for security
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Create new user
    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hashed_password,
        role=role
    )
    
    # Save user to database
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "message": "User created successfully",
            "user": {
                "id": new_user.id,
                "email": new_user.email,
                "first_name": new_user.first_name,
                "last_name": new_user.last_name,
                "role": new_user.role
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/access_account/', methods=['POST'])
def access_account():
    data = request.get_json()
    
    # Extract login credentials
    email = data.get('email')
    password = data.get('password')
    
    # Validate required fields
    if not all([email, password]):
        return jsonify({"error": "Email and password are required"}), 400
    
    # Find user by email
    user = User.query.filter_by(email=email).first()
    
    # Check if user exists and password is correct
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "role": user.role
            }
        }), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "API is running"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(host='0.0.0.0', port=5002, debug=True)