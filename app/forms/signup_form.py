from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def name_format(form, field):
    # Checking to see if the input is in the requested format
    name_pattern = r"^[a-zA-Z][a-zA-Z ]*$"
    if not re.match(name_pattern, field.data):
        raise ValidationError("Input can only contain letters and spaces in between words.")


def email_format(form, field):
    # Checking to see if the email inputted is in the requested format
    email = field.data
    email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
    if not re.match(email_pattern, email):
        raise ValidationError("Not a valid email.")


def password_length(form, field):
    # Checking if password length is at least 6 characters long
    password = field.data
    if len(password) < 6:
        raise ValidationError('Must be at least 6 characters.')


def max_char_15(form, field):
    # Checking if user input is no more than 15 characters long
    if len(field.data) > 15:
         raise ValidationError("Input must not exceed 15 characters.")


def max_char_40(form, field):
    # Checking if user input is no more than 40 characters long
    if len(field.data) > 40:
        raise ValidationError("Input must not exceed 40 characters.")


def max_char_255(form, field):
    # Checking if user input is no more than 40 characters long
    if len(field.data) > 255:
        raise ValidationError("Input must not exceed 255 characters.")



def starting_with_spaces(form, field):
    if (field.data).startswith(' '):
        raise ValidationError('Input cannot begin with a space.')



class SignUpForm(FlaskForm):
    first_name = StringField(
        'first name', validators=[DataRequired(), starting_with_spaces, max_char_15, name_format])
    last_name = StringField(
        'last name', validators=[DataRequired(), starting_with_spaces, max_char_15, name_format])
    username = StringField(
        'username', validators=[DataRequired(), username_exists, starting_with_spaces, max_char_40])
    email = StringField('email', validators=[DataRequired(), user_exists, starting_with_spaces, email_format, max_char_255])
    password = StringField('password', validators=[DataRequired(), password_length, starting_with_spaces, max_char_255])
