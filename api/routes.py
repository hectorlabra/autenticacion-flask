from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({"message": "Name, email, and password are required."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered."}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(name=name, email=email, password=hashed_password)
    new_user.save()

    return jsonify({"message": "User registered successfully."}), 201

@api.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials."}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello {current_user} welcome."}), 200
