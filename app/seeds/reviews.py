from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_files.reviews_seed_data import reviews_data


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    
    for review in reviews_data:
        seed_review = Review(
            review=review['review'],
            star_rating=review['star_rating'],
            user_id=review['user_id'],
            product_id=review['product_id']
        )
        db.session.add(seed_review)
    db.session.commit()
    
    # review_1 = Review(
    #     user_id=1, review='Great product! Highly recommended.', star_rating=5, product_id=1)
    # review_2 = Review(
    #     user_id=2, review='Decent product. Could use some improvements.', star_rating=3, product_id=1)
    # review_3 = Review(
    #     user_id=3, review="Not happy with this product. Waste of money.", star_rating=1, product_id=2)

    # db.session.add(review_1)
    # db.session.add(review_2)
    # db.session.add(review_3)
    # db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
