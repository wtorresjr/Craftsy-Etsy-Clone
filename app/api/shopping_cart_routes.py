from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models.cartitems import CartItem
from ..models.product import Product
from ..models.carts import Cart
from ..models import db

shopping_cart_routes = Blueprint('cart', __name__)


# Get Shopping Cart for Current User

@shopping_cart_routes.route('', methods=['GET'])
@login_required
def get_shopping_cart():
    # Get user ID
    user_id = int(current_user.get_id())
    # Retrieve items in cart by url id

    # Search for cart & validate it's existence
    cart = Cart.query.filter_by(user_id=user_id, transaction_complete=False).first();
    if not cart:
        return jsonify({"message": "Cart not found."}), 404

    # Authorization validation
    if cart.user_id != user_id:
        return jsonify({"message": "Forbidden."}), 403

    cart_items = CartItem.query.filter_by(cart_id=cart.id).all()

    # Proceed with going through the list of items found in cart
    if cart_items:
        cart_items_data = []
        # Find the product IDs from the list of items
        for item in cart_items:
            product = Product.query.get(item.product_id)
            # Create our response data format
            if product:
                cart_item_data = {
                    "id": item.id,
                    "name": product.name,
                    "price": product.price,
                    "quantity": item.quantity,
                    "preview_image_url": [product_img.image_url for product_img in product.product_images if product_img.preview == True]
                }

                cart_items_data.append(cart_item_data)

        return jsonify({"Cart": cart_items_data})
    else:
        return jsonify({"Message": "No items in the cart."})


@shopping_cart_routes.route('/orders', methods=['GET'])
@login_required
def get_orders():
    # Get user ID
    user_id = int(current_user.get_id())

    # Search for orders & validate their existence
    orders = Cart.query.filter_by(user_id=user_id, transaction_complete=True).all()
    if not orders:
        return jsonify({"message": "No previous orders."}), 404

    # Authorization validation
    for order in orders:
        if order.user_id != user_id:
            return jsonify({"message": "Forbidden."}), 403

    orders_data = []

    # Iterate through each order
    for order in orders:
        cart_items = CartItem.query.filter_by(cart_id=order.id).all()

        cart_items_data = []
        # Proceed with going through the list of items found in the order
        for item in cart_items:
            product = Product.query.get(item.product_id)
            # Create our response data format
            if product:
                cart_item_data = {
                    "id": item.id,
                    "name": product.name,
                    "price": product.price,
                    "quantity": item.quantity,
                    "preview_image_url": [product_img.image_url for product_img in product.product_images if product_img.preview == True]
                }

                cart_items_data.append(cart_item_data)

        orders_data.append({
            "cart_id": order.id,
            "items": cart_items_data
        })

    return jsonify({"Orders": orders_data})


# Add to Shopping Cart for Current User


@shopping_cart_routes.route('/<int:cart_id>', methods=['POST'])
@login_required
def add_item_to_cart(cart_id):
    # Get user ID
    user_id = int(current_user.get_id())
    # Get user request data
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')

    # Search for cart & validate it's existence
    cart = Cart.query.get(cart_id)
    if not cart:
        return jsonify({"message": "Cart not found."}), 404

    # Authorization validation
    if cart.user_id != user_id:
        return jsonify({"message": "Forbidden."}), 403

   # Validate required fields
    if not (product_id and quantity):
        return jsonify({"message": "Missing required fields."}), 400

    # Search for product & validate it's existence
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found."}), 404

    # Check if the product already exists in the user's cart
    cart_item = CartItem.query.filter_by(
        cart_id=cart_id, product_id=product_id).first()

    if cart_item:
        # If the product exists, update the quantity
        cart_item.quantity += quantity
    else:
        # If the product does not exist, create a new cart item
        cart_item = CartItem(product_id=product_id,
                             cart_id=cart_id, quantity=quantity)
        db.session.add(cart_item)

    # Commit the changes to the database
    db.session.commit()
    return jsonify({"message": "Item added to cart."}), 201


# Delete from cart

@shopping_cart_routes.route('/<int:cart_id>/cart_items/<int:cart_items_id>', methods=['DELETE'])
@login_required
def remove_item_from_cart(cart_id, cart_items_id):
    # Get user ID
    user_id = int(current_user.get_id())

    # Search for cart & validate it's existence
    cart = Cart.query.get(cart_id)
    if not cart:
        return jsonify({"message": "Cart not found."}), 404

    # Authorization validation
    if cart.user_id != user_id:
        return jsonify({"message": "Forbidden."}), 403

    # Check if the cart item exists
    cart_item = CartItem.query.get(cart_items_id)
    if not cart_item:
        return jsonify({"message": "Item couldn't be found."}), 404

    # Remove the item from the cart
    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({"message": "Item removed from cart."}), 200

# Edit Cart Quantity


@shopping_cart_routes.route('/<int:cart_id>/cart_items/<int:cart_items_id>', methods=['PUT'])
@login_required
def edit_shopping_cart(cart_id, cart_items_id):
    # Get user ID
    user_id = int(current_user.get_id())
    # Get user request data
    data = request.json
    new_quantity = data.get('quantity')

    # Search for cart & validate it's existence
    cart = Cart.query.get(cart_id)
    if not cart:
        return jsonify({"message": "Cart not found."}), 404

    # Authorization validation
    if cart.user_id != user_id:
        return jsonify({"message": "Forbidden."}), 403

    # Check if the cart item exists
    cart_item = CartItem.query.get(cart_items_id)
    if not cart_item:
        return jsonify({"message": "Item couldn't be found."}), 404

    # Validate the quantity field
    if new_quantity is None or not isinstance(new_quantity, int) or new_quantity <= 0:
        return jsonify({"message": "Invalid quantity value."}), 400

    # Update the quantity of the cart item
    cart_item.quantity = new_quantity
    db.session.commit()

    return jsonify({"message": "Item successfully updated."}), 200

# Purchase Items in Cart


@shopping_cart_routes.route('/<int:cart_id>', methods=['PUT'])
@login_required
def purchase_cart_items(cart_id):
    # Get user ID
    user_id = int(current_user.get_id())
    # Get user request data
    data = request.json
    cart_data = data.get('Cart')

    # Search for cart & validate it's existence
    cart = Cart.query.get(cart_id)

    if not cart:
        return jsonify({"message": "Cart not found."}), 404

    # Authorization validation
    if cart.user_id != user_id:
        return jsonify({"message": "Forbidden."}), 403

    # Validate user response data
    if not cart_data or not isinstance(cart_data, list):
        return jsonify({"message": "Invalid request body."}), 400

    # List to store the IDs of purchased items for deletion
    purchased_item_ids = []

    # Loop through each item in the cart and mark it as purchased
    for item_data in cart_data:
        product_id = item_data.get('product_id')
        purchased = item_data.get('purchased')

        # Validate the fields
        if not (product_id and isinstance(product_id, int)):
            return jsonify({"message": "Invalid item data."}), 400

        # Check if the cart item exists
        cart_item = CartItem.query.filter_by(
            cart_id=cart_id, product_id=product_id).first()
        if not cart_item:
            return jsonify({"message": f"Cart item {product_id} not found."}), 404

        # Add the cart item ID to the list for deletion if purchased is true
        if purchased:
            purchased_item_ids.append(cart_item.id)

    # Commit the changes to delete items
    for item_id in purchased_item_ids:
        item_to_delete = CartItem.query.get(item_id)
        if item_to_delete:
            db.session.delete(item_to_delete)

    db.session.commit()

    return jsonify({"message": "Purchase completed."}), 200
