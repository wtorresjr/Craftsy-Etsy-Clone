from flask import Blueprint, jsonify, session, request
from ..models import Review, ReviewImage, db
from flask_login import current_user, login_required

reviews_routes = Blueprint('reviews', __name__)


# Edit a Review By Review Id

@reviews_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_review_by_id(review_id):
    current_review = Review.query.get(review_id)
    if not current_review:
        return jsonify({"message": "review does not exist"}), 404
    elif current_user.id == current_review.user_id:
        data = request.get_json()

        # validations
        stars = data.get('stars')
        updated_review_string = data.get('review')
        if not (stars == 1 or stars == 2 or stars == 3 or stars == 4 or stars == 5):
            return jsonify({"message": "Bad Request",
                            "errors": {
                                "star_rating": "Stars must be an integer from 1 to 5"
                            }}), 400

        if updated_review_string == "":
            return jsonify({"message": "Bad Request",
                            "errors": {
                                "review": "Review text is required"
                            }}), 400

        current_review.review = updated_review_string
        current_review.star_rating = stars

        db.session.commit()

        return current_review.to_dict()
    else:
        return jsonify({"message": "current user does not own this review"}), 403


# Delete a Review By Review Id


@reviews_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review_by_id(review_id):
    current_review = Review.query.get(review_id)

    if not current_review:
        return jsonify({"message": "Review couldn't be found"}), 404
    elif current_user.id == current_review.user_id:
        ReviewImage.query.filter_by(review_id=review_id).delete()

        db.session.delete(current_review)
        db.session.commit()

        return jsonify({"message": "Successfully deleted"}), 200
    else:
        return jsonify({"message": "current user does not own this review"}), 403


# Add A Review Image


@reviews_routes.route('/<int:review_id>/images', methods=['POST'])
@login_required
def add_review_image(review_id):
    data = request.get_json()

    current_review = Review.query.get(review_id)

    if not current_review:
        return jsonify({"message": "Review couldn't be found"}), 404
    elif current_user.id == current_review.user_id:
        validation_check = data.get("image_url")

        if not (validation_check[-4:] == '.jpg' or validation_check[-4:] == '.png' or validation_check[-5:] == '.jpeg'):
            return jsonify({"message": "Images must be .jpg, .jpeg, or .png format."}), 400

        new_image = ReviewImage(review_id=review_id,
                                image_url=data.get("image_url"))
        # print(new_image, "<-----------------------IMAGE BEING SENT")
        db.session.add(new_image)
        db.session.commit()

        return new_image.to_dict()
    else:
        return jsonify({"message": "current user does not own this review"}), 403


# Delete A Review Image


@reviews_routes.route('/<int:review_id>/images/<int:image_id>', methods=['DELETE'])
@login_required
def delete_review_image(review_id, image_id):
    current_review = Review.query.get(review_id)
    current_image = ReviewImage.query.get(image_id)
    if not current_review:
        return jsonify({"message": "Review couldn't be found"}), 404
    elif not current_image:
        return jsonify({"message": "No review image by that id."}), 404
    elif current_user.id == current_review.user_id:
        db.session.delete(current_image)
        db.session.commit()
        return jsonify({"message": "Review image deleted successfully."}), 200
    else:
        return jsonify({"message": "current user does not own this review"}), 403
