from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError


class CreateProductForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])