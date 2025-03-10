from flask import Flask, request, jsonify
from models import db
from models.user import User
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  
from dotenv import load_dotenv
import bcrypt
import os
import jwt
import datetime
import secrets
from functools import wraps

def generate_secret_key():
    return secrets.token_hex(16)

# Load environment variables
load_dotenv()

app = Flask(__name__)

# CORS configuration
CORS(app, supports_credentials=True)

# Configure database and JWT settings
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/authdb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', generate_secret_key())
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=15)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = datetime.timedelta(days=7)

# Initialize database and migration
db.init_app(app)
migrate = Migrate(app, db)

# Middleware for JWT token verification
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            token = token.split(" ")[1] if " " in token else token
            decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            user = User.query.get(decoded['user_id'])
            if not user:
                return jsonify({'message': 'User not found!'}), 404
            return f(user, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401

    return decorated

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"message": "Hello from Auth Service!"})

@app.route('/register/', methods=['POST'])
def register_user():
    user_data = request.get_json()
    required_fields = ['first_name', 'last_name', 'email', 'password', 'role']
    
    if not all(user_data.get(field) for field in required_fields):
        return jsonify({"error": "All fields are required"}), 400
    
    existing_user = User.query.filter_by(email=user_data['email']).first()
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 409

    hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = User(
        first_name=user_data['first_name'],
        last_name=user_data['last_name'],
        email=user_data['email'],
        password=hashed_password,
        role=user_data.get('role', 'user')
    )

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

@app.route('/login/', methods=['POST'])
def login_user():
    login_data = request.get_json()
    email = login_data.get('email')
    password = login_data.get('password')
    
    if not all([email, password]):
        return jsonify({"error": "Email and password are required"}), 400
    
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        access_token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + app.config['JWT_ACCESS_TOKEN_EXPIRES']
        }, app.config['SECRET_KEY'], algorithm='HS256')

        refresh_token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + app.config['JWT_REFRESH_TOKEN_EXPIRES']
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token
        }), 200

    return jsonify({"error": "Invalid email or password"}), 401

@app.route('/refresh/', methods=['POST'])
def refresh_token():
    refresh_token = request.json.get('refresh_token')
    if not refresh_token:
        return jsonify({"error": "Refresh token is required"}), 400

    try:
        decoded = jwt.decode(refresh_token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = decoded['user_id']
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        access_token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + app.config['JWT_ACCESS_TOKEN_EXPIRES']
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({
            "access_token": access_token,
            "refresh_token": refresh_token  # Return the same refresh token
        }), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Refresh token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid refresh token"}), 401

@app.route('/user/<int:user_id>/', methods=['GET'])
@token_required
def get_user_by_id(user, user_id): 
    fetched_user = User.query.get(user_id) 
    if fetched_user is None:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({
        'id': fetched_user.id,
        'first_name': fetched_user.first_name,
        'last_name': fetched_user.last_name,
        'email': fetched_user.email,
        'role': fetched_user.role,
        'created_at': fetched_user.created_at.isoformat()
    })

@app.route('/protected', methods=['GET'])
@token_required
def get_user_info(user):  # เปลี่ยนชื่อฟังก์ชันที่นี่
    return jsonify({
        'message': f'Hello, {user.first_name}! This is a protected route.',
        'user': {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role
        }
    }), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(host='0.0.0.0', port=5002, debug=True)
