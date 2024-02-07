from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.awsS3 import ALLOWED_EXTENSIONS

class CreateReviewForm(FlaskForm):
  review = StringField('review')
  star_rating = IntegerField('star rating', validators=[DataRequired()])
  image_url = FileField('image_url', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
