from flask import Blueprint, jsonify

favorites_routes = Blueprint('favorites', __name__)


@favorites_routes.route('/', methods=['GET'])
def favorites_test():
    data = {"Test": "Route works"}
    return jsonify(data)
