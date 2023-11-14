from flask import Blueprint, jsonify, session, request
from app.models import User, Product, Review, ProductImage, ReviewImage, Cart, CartItem, db
from app.forms.create_product_form import CreateProductForm
from flask_login import current_user, login_user, logout_user, login_required, UserMixin

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
