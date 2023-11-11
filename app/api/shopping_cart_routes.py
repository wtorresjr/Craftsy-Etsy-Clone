from flask import Blueprint, jsonify

shopping_cart_routes = Blueprint('cart', __name__)


@shopping_cart_routes.route('/<int:cart_id>', methods=['GET'])
def get_shopping_cart(cart_id):
    data = {"Shopping Cart Route": f"Users Cart Id is: {cart_id}"}

    return jsonify(data)
