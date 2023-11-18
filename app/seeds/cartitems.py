from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_files.cartitems_seed_data import cart_items_data


# Adds a demo user, you can add other users here if you want
def seed_cartitems():
    for cart_item in cart_items_data:
        seed_cart_item = CartItem(
            product_id=cart_item['product_id'],
            cart_id=cart_item['cart_id'],
            quantity=cart_item['quantity']
        )
        db.session.add(seed_cart_item)
        
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
