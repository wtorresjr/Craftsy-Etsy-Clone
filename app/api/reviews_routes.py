from flask import Blueprint, jsonify, session, request
from flask_login import login_required
# from app.models import Review, db

reviews_routes = Blueprint('/products/<int:product_id>/reviews', __name__)

@reviews_routes('/', methods="GET")
def get_review_by_product_id(product_id):
    data = {"Reviews":f"Reviews foir {product_id}"}
    return jsonify(data)
