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


def email_format(form, field):
    email = form.data
    email_pattern = r"^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"
    if not re.match(email_pattern, email):
        raise ValidationError("Not a valid email.")


def password_length(form, field):
    # Chekcing if password length is at least 6 characters long
    password = field.data
    if len(password) < 6:
        raise ValidationError('Must be at least 6 characters.')


def max_char_first_name(form, field):
    first_name = field.data
    if len(first_name) > 15:
        raise ValidationError('Character limit exceeded. Must be no more than 15 characters.')


def max_char_last_name(form, field):
    last_name = field.data
    if len(last_name) > 15:
        raise ValidationError('Character limit exceeded. Must be no more than 15 characters.')


class SignUpForm(FlaskForm):
    first_name = StringField(
        'first name', validators=[DataRequired(), max_char_first_name])
    last_name = StringField(
        'last name', validators=[DataRequired(), max_char_last_name])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, email_format])
    password = StringField('password', validators=[DataRequired(), password_length])
