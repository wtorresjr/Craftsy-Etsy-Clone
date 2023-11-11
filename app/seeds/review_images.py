from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reviewimages():
    reviewimage_1 = ReviewImage(
        reivew_id = 1, image_url = "image.jpg")
    reviewimage_2 = ReviewImage(
        reivew_id = 2, image_url = "image.png")
    reviewimage_3 = ReviewImage(
        reivew_id = 3, image_url = "image.jpeg")

    db.session.add(reviewimage_1)
    db.session.add(reviewimage_2)
    db.session.add(reviewimage_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviewimages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviewimages"))

    db.session.commit()
