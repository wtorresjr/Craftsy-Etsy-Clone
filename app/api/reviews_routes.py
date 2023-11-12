from flask import Blueprint, jsonify, session, request

reviews_routes = Blueprint('reviews', __name__)


# Edit a Review By Review Id


@reviews_routes.route('/<int:review_id>', methods=['PUT'])
def edit_review_by_id(review_id):
    data = request.get_json()
    return jsonify(data)


# Delete a Review By Review Id


@reviews_routes.route('/<int:review_id>', methods=['DELETE'])
def delete_review_by_id(review_id):
    data = {"Product Reviews": f"Deleted product review by review id: {review_id}"}
    return jsonify(data)


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
