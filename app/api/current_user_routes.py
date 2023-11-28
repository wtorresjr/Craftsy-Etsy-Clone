from flask import Blueprint, jsonify, session, request
from ..models import User, Review, Favorite, Product, ReviewImage, db
from flask_login import login_required, current_user, LoginManager


current_user_routes = Blueprint('current-user', __name__)


# Get Current User Info

@current_user_routes.route('/', methods=['GET'])
@login_required
def get_current_user_info():
    if current_user:
        return {"user": current_user.to_dict()}
    else:
        return {'user': 'null'},


# Get All Current User Reviews

@current_user_routes.route('/reviews', methods=['GET'])
@login_required
def get_current_user_reviews():
    current_user_reviews = Review.query.filter_by(
        user_id=current_user.id).all()

    if not current_user_reviews:
        return {'message': 'You have not created any reviews.'}

    reviews_list = []
    for review in current_user_reviews:

        review_info = {
            "id": review.id,
            "user_id": review.user_id,
            "product_id": review.product_id,
            "review": review.review,
            "star_rating": review.star_rating,
            "User": {
                "id": review.user.id,
                "first_name": review.user.first_name,
                "last_name": review.user.last_name,
            },
            "Product": {
                "id": review.products.id,
                "name": review.products.name,
                "description": review.products.description,
                "price": review.products.price,
                "preview_image_url": [product_img.image_url for product_img in review.products.product_images if product_img.preview == True],
                "user_id": review.products.user_id,
            },
            "Review_Images": [{'id': image.id, 'image_url': image.image_url} for image in review.review_images]
        }
        reviews_list.append(review_info)

    return {"Reviews": reviews_list}


# View Current User Favorites

@current_user_routes.route('/favorites', methods=['GET'])
@login_required
def get_curr_user_favorites():
    current_user_favorites = Favorite.query.filter_by(
        user_id=current_user.id).all()

    if not current_user_favorites:
        return {'message': 'You have no saved favorites.'}

    for favorite in current_user_favorites:
        if favorite.products.quantity == 0:
            return {'message': 'Sorry, this item is sold out'}

    favorites_list = []
    for favorite in current_user_favorites:
        about_favorite = {
            "id": favorite.id,
            "name": favorite.products.name,
            "price": favorite.products.price,
            "quantity": favorite.products.quantity,
            "preview_image_url": [product_img.image_url for product_img in favorite.products.product_images if product_img.preview == True],
        }

        favorites_list.append(about_favorite)

    return {"Favorites": favorites_list}


#  Add Favorite

@current_user_routes.route('/favorites', methods=['POST'])
@login_required
def add_to_favorites():
    data = request.get_json()
    find_favorite = Favorite.query.filter_by(
        product_id=data.get('product_id'), user_id=current_user.id).first()
    if find_favorite:
        return {'message': 'This product has already been favorited. Please unfavorite product before attempting to favorite it again.'}, 400
    new_favorite = Favorite(product_id=data.get(
        'product_id'), user_id=current_user.id)
    db.session.add(new_favorite)
    db.session.commit()

    return new_favorite.to_dict(), 201


# Delete a Favorite

@current_user_routes.route('/favorites/<int:product_id>', methods=['DELETE'])
@login_required
def delete_a_favorite(product_id):
    current_favorite = Favorite.query.filter_by(product_id=product_id).first()
    # print(current_favorite, "Current Fave")
    if not current_favorite:
        return {'message': 'No favorited product by that id was found.'}, 404

    print(current_user.id, "<----- User id")
    print(current_favorite.user_id, "<----- Current Fav User id")

    if current_user.id == current_favorite.user_id:
        db.session.delete(current_favorite)
        db.session.commit()
        return {'message': 'Successfully deleted.'}
    else:
        return {'message': 'Forbidden'}, 403
