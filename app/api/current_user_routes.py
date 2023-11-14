from flask import Blueprint, jsonify, session, request
from app.models import (Review, User, db)
from flask_login import login_required, current_user, LoginManager

current_user_routes = Blueprint('current-user', __name__)


# Get Current User Info

@current_user_routes.route('/', methods=['GET'])
@login_required
def get_current_user_info():
    # curr_user_info = User.query.filter_by(email=request.get_json())
     if current_user.is_authenticated:
        print(current_user.to_dict())
        return current_user.to_dict()
     else:
         return {'user': 'null'}



# Get All Current Users Reviews

@current_user_routes.route('/reviews', methods=['GET'])
@login_required
def get_current_user_reviews():
    current_user_id = current_user.id

    current_user_reviews = Review.query.filter_by(user_id=current_user_id).all()

    if not current_user_reviews:
        return jsonify({"message": "You have not created any reviews."
    })

    reviews_list = [review.to_dict() for review in current_user_reviews]
    return jsonify(reviews_list)



## Krystals Code....
# View Current User Favorites


@current_user_routes.route('/favorites', methods=['GET'])
@login_required
def get_curr_user_favorites():
    data = {"Favorites": "Current user favorites here"}
    return jsonify(data)


#  Add Favorite


@current_user_routes.route('/favorites', methods=['POST'])
@login_required
def add_to_favorites():
    data = request.get_json()
    return jsonify(data)


# Delete a Favorite


@current_user_routes.route('/favorites/<int:favorite_id>', methods=['DELETE'])
@login_required
def delete_a_favorite(favorite_id):
    data = {"Message": f"Successfully deleted favorite with an id of {favorite_id}"}
    return jsonify(data)
