from .db import db, environment, SCHEMA
from datetime import datetime


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    price = db.Column(db.Float, nullable=False)
    # preview_image_url = db.Column(db.String(255), nullable=False, default="http://")

    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"))


    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    ## RELATIONSHIPS
    user = db.relationship("User", back_populates="products")
    favorites = db.relationship("Favorite", back_populates="products")
    product_images = db.relationship('ProductImage', back_populates="products")
    cartitems = db.relationship('CartItem', back_populates="products")
    reviews = db.relationship('Review', back_populates='products')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'quantity': self.quantity,
            'price': self.price,
            # 'preview_image_url': self.preview_image_url,
            'user_id': self.user_id
        }
