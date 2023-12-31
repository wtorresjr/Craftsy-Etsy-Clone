from .db import db, environment, SCHEMA
from datetime import datetime
from .user import User
from .db import add_prefix_for_prod


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    price = db.Column(db.Float, nullable=False)

    # user_id = db.Column(db.Integer, db.ForeignKey('craftsy_schema.users.id'))
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS
    user = db.relationship("User", back_populates="products")
    favorites = db.relationship(
        "Favorite", back_populates="products", cascade='all,delete-orphan')
    product_images = db.relationship(
        'ProductImage', back_populates="products", cascade='all,delete-orphan')
    cartitems = db.relationship(
        'CartItem', back_populates="products", cascade='all,delete-orphan')
    reviews = db.relationship(
        'Review', back_populates='products', cascade='all,delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'quantity': self.quantity,
            'price': self.price,
            'user_id': self.user_id
        }
