from .db import db, environment, SCHEMA
from datetime import datetime


class ProductImage(db.Model):
    __tablename__ = "product_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    products = db.relationship("Product", back_populates="product_images")

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'image_url': self.image_url,
            'preview': self.preview
        }
