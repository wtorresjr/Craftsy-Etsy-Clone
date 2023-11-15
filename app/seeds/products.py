from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    product_1 = Product(name="Coffee Mug", description="Personlizable coffee or tea mug. 16 ounces.",
                        quantity=50, price=19.99, user_id=1)
    product_2 = Product(name="Coasters", description="Set of 6 silicone coasters. Multicolored.",
                        quantity=35, price=12.95, user_id=2)
    product_3 = Product(name="Ring Dish", description="Ring and jewlery dish. Measures approximately 4 inches by 6 inches.",
                        quantity=100, price=28.97, user_id=1)

    db.session.add(product_1)
    db.session.add(product_2)
    db.session.add(product_3)
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
