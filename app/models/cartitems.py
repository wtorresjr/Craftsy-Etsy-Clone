from .db import db, environment, SCHEMA
from datetime import datetime

class CartItem(db.Model):
    __tablename__ = 'cartitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    cart_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    products = db.relationship("Product", back_populates='cartitems')

    def to_dict(self):
      return {
        'id': self.id,
        'product_id': self.product_id,
        'cart_id': self.cart_id,
        'quantity': self.quantity
      }
