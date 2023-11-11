from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms.create_product_form import CreateProductForm

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


# Create a Product Review by Product Id

# Krystal's route ----
@products_routes.route('/<int:product_id>/reviews', methods=['POST'])
def create_product_review(product_id):
    data = request.get_json()
    return jsonify(data)
