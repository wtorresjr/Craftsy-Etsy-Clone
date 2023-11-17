from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime
from .db import add_prefix_for_prod


class Cart(db.Model, UserMixin):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    transaction_complete = db.Column(db.Boolean, nullable=False)


    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    cartitems = db.relationship("CartItem", back_populates='carts')
    user = db.relationship("User", back_populates="carts")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
        }
