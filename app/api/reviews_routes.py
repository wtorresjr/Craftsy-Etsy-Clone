from flask import Blueprint, jsonify, session, request
from ..models import Review, ReviewImage, db

reviews_routes = Blueprint('reviews', __name__)


# Edit a Review By Review Id

@reviews_routes.route('/<int:review_id>', methods=['PUT'])
def edit_review_by_id(review_id):
    current_review = Review.query.get(review_id)

    data = request.get_json()

    current_review.review = data.get('review')
    current_review.star_rating = data.get('stars')

    db.session.commit()

    return current_review.to_dict()


# Delete a Review By Review Id


@reviews_routes.route('/<int:review_id>', methods=['DELETE'])
def delete_review_by_id(review_id):
    current_review = Review.query.get(review_id)

    if current_review:
        ReviewImage.query.filter_by(review_id = review_id).delete()

        db.session.delete(current_review)
        db.session.commit()
        return jsonify({"message": "Successfully deleted"})
    else:
        return jsonify({"message": "Review couldn't be found"})


# Add A Review Image


@reviews_routes.route('/<int:review_id>/images', methods=['POST'])
def add_review_image(review_id):
    data = request.get_json()
    return jsonify(data)


# Delete A Review Image


@reviews_routes.route('/<int:review_id>/images/<int:image_id>', methods=['DELETE'])
def delete_review_image(review_id, image_id):
    data = {"message": f"Successfully deleted the image #{image_id} belonging to product #{review_id}"}
    return jsonify(data)
