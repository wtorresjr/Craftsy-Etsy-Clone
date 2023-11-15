from flask import Blueprint, jsonify, session, request, url_for, abort
from app.models import User, db, Product, ProductImage, Review
from app.forms.create_product_form import CreateProductForm
from flask_login import current_user
from sqlalchemy import func
from sqlalchemy.orm import joinedload

products_routes = Blueprint('products', __name__)


# Get All Products


@products_routes.route('/', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    # products_data = [product.to_dict() for product in products]
    products_with_images = []

    for product in products:
        product_data = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'preview_image_url': product.preview_image_url,
            'user_id': product.user_id,
            'Product_Images': [{'id': image.id, 'image_url': image.image_url, 'preview': image.preview} for image in product.product_images]
        }
        products_with_images.append(product_data)

    return jsonify({
        "Products": products_with_images,

    })


# Get Product By Id


@products_routes.route('/<int:product_id>',  methods=['GET'])
def get_product_details(product_id):
    # product_ids = Product.query.filter(Product.id).all()
    # print(product_ids)
    product_info = Product.query.get(product_id)
    number_of_reviews = len(product_info.reviews)
    average_rating = db.session.query(func.avg(Review.star_rating)).filter(
        Review.product_id == product_id).scalar()
    # print("this is the average ------------------", average_rating)

    if not product_info:
        return jsonify({"message": f"Product couldn't be found"}), 404

    product_with_additional_info = {
        'id': product_info.id,
        'name': product_info.name,
        'description': product_info.description,
        'price': product_info.price,
        'preview_image_url': product_info.preview_image_url,
        'user_id': product_info.user_id,
        'num_reviews': number_of_reviews,
        'avg_star_rating': average_rating,
        'Product_Images': [{'id': image.id, 'image_url': image.image_url, 'preview': image.preview} for image in product_info.product_images]

    }

    return jsonify(product_with_additional_info)


# Delete Product By Id


@products_routes.route('/<int:product_id>', methods=['DELETE'])
def delete_product_by_id(product_id):
    product_info = Product.query.get(product_id)

    if not product_info:
        return jsonify({"message": f"Product couldn't be found"}), 404

    if product_info.user_id == current_user.id:
        db.session.delete(product_info)
        db.session.commit()
        return jsonify({"message": f"Successfully deleted"}), 200
    else:
        return jsonify({"message": "Forbidden"}), 403


# Product Reviews By Id


@products_routes.route('/<int:product_id>/reviews', methods=['GET'])
def get_reviews_by_product_id(product_id):

    product = Product.query.get(product_id)

    reviews = []
    for review in product.reviews:

        for review_img in review.review_images:
            curr_review_imgs = [{
                "id": review_img.id,
                "image": review_img.image_url
            }]

        reviews.append({
            "id": review.id,
            "user_id": review.user_id,
            "product_id": review.product_id,
            "review": review.review,
            "star_rating": review.star_rating,
            "User": {
                "id": review.user.id,
                "firstName": review.user.first_name,
                "lastName": review.user.last_name
            },
            "ReviewImages": curr_review_imgs
        })

    return jsonify({"Reviews": reviews})


# Create New Product


@products_routes.route('/', methods=['POST'])
def create_new_product():

    data = request.get_json()

    # Returning request body for testing.
    return jsonify(data)


# Edit a Product by Id

@products_routes.route('/<int:product_id>', methods=['PUT'])
def edit_product_by_id(product_id):

    items_edited = request.get_json()

    data = {
        "Editing Product Id": product_id,
        "Fields Edited": items_edited
    }

    return jsonify(data)


# Krystal's routes ----
# Create a Product Review by Product Id

@products_routes.route('/<int:product_id>/reviews', methods=['POST'])
def create_product_review(product_id):
    data = request.get_json()
    return jsonify(data)


# Get all products created by currrent-user

@products_routes.route('/current-user', methods=['GET'])
def get_current_user_products():
    data = {"Products": "All products belonging to current user"}
    return jsonify(data)


# Krystal's Code....
# Add a Product Image

@products_routes.route('/<int:product_id>/images', methods=['POST'])
def add_product_image(product_id):
    data = request.get_json()
    return jsonify(data)

# Delete a Product Image


@products_routes.route('/<int:product_id>/images/<int:image_id>', methods=['DELETE'])
def delete_product_image(product_id, image_id):
    data = {"message": f"Successfully deleted the image #{image_id} belonging to product #{product_id}"}
    return jsonify(data)
