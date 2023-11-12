from flask import Blueprint, jsonify, request

shopping_cart_routes = Blueprint('cart', __name__)


# Get Shopping Cart for Current User

@shopping_cart_routes.route('/<int:cart_id>', methods=['GET'])
def get_shopping_cart(cart_id):
    data = {"Shopping Cart Route": f"Users Cart Id is: {cart_id}"}

    return jsonify(data)

# Add to Shopping Cart for Current User


@shopping_cart_routes.route('/<int:cart_id>', methods=['POST'])
def add_item_to_cart(cart_id):
    # Use cart_id to populate cart_id in json object when posting to table.
    data = request.get_json()

    return jsonify(data)


# Delete from cart

@shopping_cart_routes.route('/<int:cart_id>/cart_items/<int:cart_items_id>', methods=['DELETE'])
def remove_item_from_cart(cart_id, cart_items_id):
    data = {
        "Delete From Cart": f"Removed item: {cart_items_id} from cart number: {cart_id}"}
    return jsonify(data)

# Edit Cart Quantity

@shopping_cart_routes.route('/<int:cart_id>/cart_items/<int:cart_items_id>', methods=['PUT'])
def edit_shopping_cart(cart_id, cart_items_id):
    item_changed = request.get_json()
    data = {
        "Edit Route": f"Editing item #{cart_items_id} in cart #{cart_id}, {item_changed}"}
    return jsonify(data)


#Purchase Items in Cart

@shopping_cart_routes.route('/<int:cart_id>', methods=['PUT'])
def purchase_cart_items(cart_id):
    data = {"Purchased Items In Cart":cart_id}
    return jsonify(data)
