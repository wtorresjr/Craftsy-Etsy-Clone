from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms.create_product_form import CreateProductForm

products_routes = Blueprint('products',__name__)

@products_routes.route('/', methods=['GET'])
def get_all_products():
    data = {"Product":"All products route reached"}
    return jsonify(data)

@products_routes.route('/<int:product_id>',  methods=['GET'])
def get_product_details(product_id):
    data = {"Product":f"Product details for product id: {product_id}"}
    return jsonify(data)


@products_routes.route('/', methods=['POST'])
def create_new_product():
    print('Post route reached <==========================')
    form = CreateProductForm()

    return 1
