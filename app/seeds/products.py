from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_files.products_seed_data import products_data

# Adds a demo user, you can add other users here if you want
def seed_products():

    for product in products_data:
        seed_product = Product(
            name=product['name'],
            description=product['description'],
            quantity=product['quantity'],
            price=product['price'],
            user_id=product['user_id'],
        )
        db.session.add(seed_product)
        
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
