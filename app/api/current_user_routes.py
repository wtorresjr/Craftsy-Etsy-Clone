from flask import Blueprint, jsonify, session, request

current_user_routes = Blueprint('current-user', __name__)


# Get Current User Info

@current_user_routes.route('/', methods=['GET'])
def get_current_user_info():
    data = {"User info": "This is user info"}
    return jsonify(data)


# Get All Current Users Reviews

@current_user_routes.route('/reviews', methods=['GET'])
def get_current_user_reviews():
    data = {"Current User Reviews": "All users reviews reached"}
    return jsonify(data)

## Krystals Code....
# View Current User Favorites


@current_user_routes.route('/favorites', methods=['GET'])
def get_curr_user_favorites():
    data = {"Favorites": "Current user favorites here"}
    return jsonify(data)


#  Add Favorite


@current_user_routes.route('/favorites', methods=['POST'])
def add_to_favorites():
    data = request.get_json()
    return jsonify(data)


# Delete a Favorite


@current_user_routes.route('/favorites/<int:favorite_id>', methods=['DELETE'])
def delete_a_favorite(favorite_id):
    data = {"Message": f"Successfully deleted favorite with an id of {favorite_id}"}
    return jsonify(data)


