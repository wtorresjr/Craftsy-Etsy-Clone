from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.awsS3 import ALLOWED_EXTENSIONS

def name_length (form, field):
    name = field.data
    if len(name) < 3 and len(name) > 30:
        raise ValidationError('Product name must be between 3 and 30 characters long.')

def description_length (form, field):
    description = field.data
    if len(description) < 3 and len(description) > 255:
        raise ValidationError('Description must be between 3 and 255 characters.')

def price_amount (form, field):
    price = field.data
    if price <= 0:
        raise ValidationError('Price must be a valid number greater than 0.')

def quantity_amount (form, field):
    quantity = field.data
    if quantity <= 0:
        raise ValidationError('Quantity must be a valid number greater than 0.')

def starting_with_spaces(form, field):
    if field.data and (field.data).startswith(' '):
        raise ValidationError('Input cannot begin with a space.')


class CreateProductForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), name_length, starting_with_spaces])
    description = StringField('description', validators=[DataRequired(), description_length, starting_with_spaces])
    price = IntegerField('price', validators=[DataRequired(), price_amount])
    quantity = IntegerField('quantity', validators=[DataRequired(), quantity_amount])
    # preview_image_url = FileField('preview image url', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
