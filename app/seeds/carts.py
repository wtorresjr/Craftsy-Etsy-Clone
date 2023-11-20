from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_files.carts_seed_data import carts_data


# Adds a demo user, you can add other users here if you want
def seed_carts():
    for cart in carts_data:
        seed_cart = Cart(
            user_id=cart['user_id'],
            transaction_complete=cart['transaction_complete']
        )
        db.session.add(seed_cart)
        
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
