from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CreateReviewForm(FlaskForm):
  review = StringField('review', validators=[DataRequired()])
  star_rating = IntegerField('star rating', validators=[DataRequired()])
