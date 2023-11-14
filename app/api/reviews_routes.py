from flask import Blueprint, jsonify, session, request
from ..models import Review, ReviewImage, db
from flask_login import current_user, login_required

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

  current_review = Review.query.get(review_id)

  if current_review:
     new_image = ReviewImage(review_id = review_id, image_url = data.get("image_url"))

     db.session.add(new_image)
     db.session.commit()

     return new_image.to_dict()
  else:
    return jsonify({"message": "Review couldn't be found"})


# Delete A Review Image


@reviews_routes.route('/<int:review_id>/images/<int:image_id>', methods=['DELETE'])
def delete_review_image(review_id, image_id):
  current_review = Review.query.get(review_id)
  current_image = ReviewImage.query.get(image_id)

  if current_review and current_image:
    db.session.delete(current_image)
    db.session.commit()
    return jsonify({"message": "Review image deleted successfully."})
  else:
    return jsonify({"message": "No review image by that id."})
