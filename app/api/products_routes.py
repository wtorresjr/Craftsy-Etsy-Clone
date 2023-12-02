from flask import Blueprint, jsonify, session, request, url_for, abort
from app.models import User, Product, Review, ProductImage, ReviewImage, Cart, CartItem, Favorite, db
from app.forms.create_product_form import CreateProductForm
from flask_login import current_user, login_required
from sqlalchemy import func
from sqlalchemy.orm import joinedload

products_routes = Blueprint('products', __name__)


# Get All Products


@products_routes.route('/', methods=['GET'])
def get_all_products():
    products = Product.query.order_by(Product.created_at.desc()).all()
    products_with_images = []

    for product in products:
        product_data = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'preview_image_url': [product_img.image_url for product_img in product.product_images if product_img.preview == True],
            'quantity': product.quantity,
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
    product_info = Product.query.get(product_id)

    if not product_info:
        return jsonify({"message": f"Product couldn't be found"}), 404

    number_of_reviews = len(product_info.reviews)
    average_rating = db.session.query(func.avg(Review.star_rating)).filter(
        Review.product_id == product_id).scalar()
    seller = product_info.user.to_dict()

    product_with_additional_info = {
        'id': product_info.id,
        'name': product_info.name,
        'description': product_info.description,
        'price': round(product_info.price, 2),
        'preview_image_url': [
            product_img.image_url for product_img in product_info.product_images if product_img.preview == True],
        'quantity': product_info.quantity,
        'user_id': product_info.user_id,
        'num_reviews': number_of_reviews,
        'avg_star_rating': average_rating,
        'Product_Images': [{'id': image.id, 'image_url': image.image_url, 'preview': image.preview} for image in product_info.product_images],
        'Seller': {'id': seller['id'], 'first_name': seller['firstName'], 'last_name': seller['lastName'], 'email': seller['email']}
    }

    return jsonify({"Product_Details": product_with_additional_info})


# Delete Product By Id


@products_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
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

    if not product:
        return jsonify({"message": "Product not found."}), 404

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

    return jsonify({"Reviews": reviews}), 200


# Create New Product


@products_routes.route('/', methods=['POST'])
@login_required
def create_new_product():

    data = request.get_json()

    new_product = Product(
        name=data.get('name'),
        description=data.get('description'),
        price=data.get('price'),
        quantity=data.get('quantity'),
        user_id=current_user.id
    )

    db.session.add(new_product)
    db.session.commit()

    newPreviewImage = ProductImage(
        product_id=new_product.id,
        image_url=data.get('preview_image_url'),
        preview=True
    )

    db.session.add(newPreviewImage)
    db.session.commit()

    product_with_img = new_product.to_dict()
    product_with_img["preview_image_url"] = data.get('preview_image_url')

    return jsonify(product_with_img)


# Edit a Product by Id

@products_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product_by_id(product_id):
    product_to_edit = Product.query.get(product_id)

    if not product_to_edit:
        return jsonify({"message": "Product not found."}), 404

# Check if logged in user is allowed to edit this product

    if product_to_edit.user_id == current_user.id:

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

    products_by_user = Product.query.filter_by(user_id=current_user.id).all()

    if not products_by_user:
        return jsonify({"message": "You have not created any items."})

    products_final = []

    for product in products_by_user:
        product_info = product.to_dict()

        for image in product.product_images:
            if image.preview == True:
                product_info['preview_image_url'] = image.image_url

        products_final.append(product_info)

    return jsonify({"User_Products": products_final})


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

        image_added = new_image.to_dict()
    else:
        return jsonify({"message": "Forbidden"}), 403

    return jsonify({"New_Image_Added": image_added}), 201


# Delete a Product Image


@products_routes.route('/<int:product_id>/images/<int:image_id>', methods=['DELETE'])
@login_required
def delete_product_image(product_id, image_id):

    product_to_edit = Product.query.get(product_id)
    product_imgs = product_to_edit.product_images

    if product_to_edit.user_id == current_user.id:
        for image in product_imgs:
            if image.id == image_id:
                db.session.delete(image)
                db.session.commit()
                return jsonify({"message": "Product image deleted successfully."}), 200

        return ({"message": "No image by that id."}), 404
    else:
        return ({"message": "Forbidden"}), 403
