from flask import Blueprint, jsonify, session, request
from app.models import User, Product, Review, ProductImage, ReviewImage, Cart, CartItem, Favorite, db
from app.forms.create_product_form import CreateProductForm
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

products_routes = Blueprint('products', __name__)


# Get All Products


@products_routes.route('/', methods=['GET'])
def get_all_products():
    data = {"Product": "All products route reached"}
    return jsonify(data)


# Get Product By Id


@products_routes.route('/<int:product_id>',  methods=['GET'])
def get_product_details(product_id):
    data = {"Product": f"Product details for product id: {product_id}"}
    return jsonify(data)


# Delete Product By Id


@products_routes.route('/<int:product_id>', methods=['DELETE'])
def delete_product_by_id(product_id):
    data = {"Product": f"Product {product_id} has been deleted"}
    return jsonify(data)


# Product Reviews By Id


@products_routes.route('/<int:product_id>/reviews', methods=['GET'])
def get_reviews_by_product_id(product_id):
    data = {"Product Review": f"Product reviews for product id: {product_id}"}
    return jsonify(data)


# Create New Product


@products_routes.route('/', methods=['POST'])
def create_new_product():

    data = request.get_json()

    # Returning request body for testing.
    return jsonify(data)


# Edit a Product by Id

@products_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product_by_id(product_id):

    product_to_edit = Product.query.get(product_id)

    if not product_to_edit:
        return jsonify({"message": "Product not found."}), 404

    try:
        user = current_user.to_dict()
    except Exception as e:
        return jsonify({"message": "Authentication Required"}), 403

# Check if logged in user is allowed to edit this product

    if product_to_edit.user_id == user['id']:

        user_changes = request.get_json()

        for [key, item] in user_changes.items():
            setattr(product_to_edit, key, item)

        db.session.commit()

        return product_to_edit.to_dict()

    else:
        return jsonify({"message": "Forbidden"}), 403


# Create a Product Review by Product Id

@products_routes.route('/<int:product_id>/reviews', methods=['POST'])
@login_required
def create_product_review(product_id):

    try:
        current_user.id

    except Exception as e:
        return jsonify({"message": "Authentication Required"}), 403

# Check for product...
    try:
        product_to_review = (Product.query.options(
            joinedload(Product.reviews)).get(product_id))

        if product_to_review:
            reviews_for_product = [review.to_dict()
                                   for review in product_to_review.reviews]

    except Exception as e:
        return ({"message": "Product not found"}), 404

    if product_to_review.user_id == current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    for review in reviews_for_product:
        if review["user_id"] == current_user.id:
            return jsonify({"message": "User already has a review for this product"}), 403

    requestData = request.get_json()

    new_review = Review(
        user_id=current_user.id,
        product_id=product_id,
        review=requestData.get('review'),
        star_rating=requestData.get('star_rating')
    )

    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict()


# Get all products created by current-user


@products_routes.route('/current-user', methods=['GET'])
@login_required
def get_current_user_products():
    user = current_user.to_dict()
    curr_user_id = user['id']

    products_by_user = Product.query.filter_by(user_id=curr_user_id).all()

    if not products_by_user:
        return jsonify({"message": "You have not created any items."})

    products_by_user = [product.to_dict() for product in products_by_user]

    return jsonify(products_by_user)


# Add a Product Image


@products_routes.route('/<int:product_id>/images', methods=['POST'])
@login_required
def add_product_image(product_id):
    product_to_add_img = Product.query.get(product_id)

    if not product_to_add_img:
        return jsonify({"message": "Product not found."})

    if product_to_add_img.user_id == current_user.id:
        requestData = request.get_json()

# If image being added is preview image check for old preview image to change to false
        if requestData.get('preview'):
            imgs_for_product = ProductImage.query.filter_by(
                product_id=product_id).all()
            for image in imgs_for_product:
                if image.preview == True:
                    image.preview = False
            db.session.commit()

        new_image = ProductImage(
            image_url=requestData.get('image_url'),
            preview=requestData.get('preview'),
            product_id=product_id
        )

        db.session.add(new_image)
        db.session.commit()
    else:
        return jsonify({"message": "Forbidden"}), 403

    return new_image.to_dict()


# Delete a Product Image


@products_routes.route('/<int:product_id>/images/<int:image_id>', methods=['DELETE'])
def delete_product_image(product_id, image_id):
    data = {"message": f"Successfully deleted the image #{image_id} belonging to product #{product_id}"}
    return jsonify(data)
