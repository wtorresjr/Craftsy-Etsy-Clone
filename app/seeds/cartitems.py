from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_cartitems():
    cartitem_1 = CartItem(
        product_id = 1, cart_id = 1, quantity = 1)
    cartitem_2 = CartItem(
        product_id = 1, cart_id = 2, quantity = 1)
    cartitem_3 = CartItem(
        product_id = 2, cart_id = 1, quantity = 1)

    db.session.add(cartitem_1)
    db.session.add(cartitem_2)
    db.session.add(cartitem_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the CartItem table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cartitems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cartitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cartitems"))

    db.session.commit()
