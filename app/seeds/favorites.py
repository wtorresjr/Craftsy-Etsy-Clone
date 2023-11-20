from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_files.favorites_seed_data import favorites_data


# Adds a favorite example testing
def seed_favorites():
    for favorite in favorites_data:
        seed_favorite = Favorite(
            product_id=favorite['product_id'],
            user_id=favorite['user_id']
        )
        db.session.add(seed_favorite)
        
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the favorites table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
