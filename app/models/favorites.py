from .db import db, environment, SCHEMA

class Favorite(db.Model):
  __tablename__ = 'favorites'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key = True)

  # product_id = db.Column(db.Integer, ForeignKey('products.id', ondelete = 'CASCADE'))
  user_id = db.Column(db.Integer, ForeignKey('users.id', ondelete = 'CASCADE'))

  #relationships one to one
  # product = relationship('Product', back_populates='favorite')
  # product database not complete yet
  user = relationship('User', back_populates='favorite')

  def to_dict(self):
    return {
      'id': self.id,
      'product_id': self.product_id,
      'user_id': self.user_id
    }
