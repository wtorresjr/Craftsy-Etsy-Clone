from flask import Blueprint, jsonify, session, request
from ..models import Review, ReviewImage, db
from flask_login import current_user, login_required
from app.forms import CreateReviewForm
from app.awsS3 import upload_file_to_s3, get_unique_filename, allowed_file

reviews_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Edit a Review By Review Id

@reviews_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_review_by_id(review_id):
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    try:
        if form.validate_on_submit():
            review_to_edit = Review.query.get(review_id)
            if not review_to_edit:
                return jsonify({"message": "review does not exist"}), 404

            # Check if logged in user is allowed to edit this review
            if review_to_edit.user_id == current_user.id:
                review_to_edit.review = form.data['review']
                review_to_edit.star_rating = form.data['star_rating']

                if "image_url" in request.files:
                    # Grabs the image
                    image_url = request.files["image_url"]

                    if not allowed_file(image_url.filename):
                        return {"errors": ["Image file type not permitted"]}, 400

                    # Preparing and sending the image to AWS
                    image_url.filename = get_unique_filename(image_url.filename)
                    upload = upload_file_to_s3(image_url)

                    if "url" not in upload:
                        return upload, 400

                    url = upload["url"]

                    find_review_img = ReviewImage.query.filter_by(review_id=review_id).first()
                    print('REVIEW IMAGE CHAGE', find_review_img)
                    if find_review_img:
                        find_review_img.image_url = url

                db.session.commit()
                return review_to_edit.to_dict()
            else:
                return jsonify({"message": "Forbidden"}), 403
    except Exception as e:
        return {'error': str(e)}, 400

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


    # elif current_user.id == current_review.user_id:
    #     data = request.get_json()

    #     # validations
    #     stars = data.get('stars')
    #     updated_review_string = data.get('review')
    #     if not (stars == 1 or stars == 2 or stars == 3 or stars == 4 or stars == 5):
    #         return jsonify({"message": "Bad Request",
    #                         "errors": {
    #                             "star_rating": "Stars must be an integer from 1 to 5"
    #                         }}), 400

    #     if updated_review_string == "":
    #         return jsonify({"message": "Bad Request",
    #                         "errors": {
    #                             "review": "Review text is required"
    #                         }}), 400

    #     current_review.review = updated_review_string
    #     current_review.star_rating = stars

    #     db.session.commit()

    #     return current_review.to_dict()
    # else:
    #     return jsonify({"message": "current user does not own this review"}), 403


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
