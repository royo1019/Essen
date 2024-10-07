from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import bcrypt
import os
import jwt
import datetime
from dotenv import load_dotenv
import logging

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Optionally restrict CORS in production

# MongoDB Connection
MONGODB_URI = os.getenv('MONGODB_URI')
client = MongoClient(MONGODB_URI, server_api=ServerApi('1'))
db = client['essenshare']
users = db['users']

try:
    client.admin.command('ping')
    logger.info("Successfully connected to MongoDB!")
except Exception as e:
    logger.error(f"Error connecting to MongoDB: {str(e)}")

# Secret key for JWT encoding/decoding
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'pannapanni')  # Change this to a secure key

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if len(password) < 8:  # Enforce a minimum password length for security
        return jsonify({"message": "Password must be at least 8 characters long"}), 400

    if users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        users.insert_one({"email": email, "password": hashed_password})
        logger.info(f"User registered successfully: {email}")
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        logger.error(f"Error registering user: {str(e)}")
        return jsonify({"message": "Database error", "error": str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = users.find_one({"email": email})
    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    try:
        if bcrypt.checkpw(password.encode('utf-8'), user['password']):
            token = jwt.encode({
                'email': email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }, app.config['SECRET_KEY'], algorithm='HS256')

            logger.info(f"Login successful for user: {email}")
            return jsonify({"message": "Login successful", "token": token}), 200
        else:
            return jsonify({"message": "Invalid email or password"}), 401

    except jwt.exceptions.PyJWTError as e:
        logger.error(f"JWT error: {str(e)}")
        return jsonify({"message": "JWT error", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
