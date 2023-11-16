from .db import db, environment, SCHEMA
from datetime import datetime


class ReviewImage(db.Model):
    __tablename__ = 'review_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'), nullable=False)
    image_url = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    reviews = db.relationship('Review', back_populates='review_images')

    def to_dict(self):
        return {
            'id': self.id,
            'review_id': self.review_id,
            'image_url': self.image_url
        }
