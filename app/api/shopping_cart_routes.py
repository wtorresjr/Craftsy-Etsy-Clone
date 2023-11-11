from flask import Blueprint, jsonify, request

shopping_cart_routes = Blueprint('cart', __name__)


# Get Shopping Cart for Current User

@shopping_cart_routes.route('/<int:cart_id>', methods=['GET'])
def get_shopping_cart(cart_id):
    data = {"Shopping Cart Route": f"Users Cart Id is: {cart_id}"}

    return jsonify(data)


@shopping_cart_routes.route('/<int:cart_id>', methods=['POST'])
def add_item_to_cart(cart_id):
    #Use cart_id to populate cart_id in json object when posting to table.
    data = request.get_json()
    
    return jsonify(data)