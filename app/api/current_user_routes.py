from flask import Blueprint, jsonify, session, request

current_user_routes = Blueprint('current-user', __name__)


# Get Current User Info
# needs fixing

# @current_user_routes.route('/', methods=['GET'])
# def get_current_user():
    
#     # current_user = User.query.get(id)
#     data = {"Current User": "Current user info."}
#     return jsonify(data)

# Get All Reviews For Current User
