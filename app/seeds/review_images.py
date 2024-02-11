from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text
import random
import requests

# Adds a demo user, you can add other users here if you want


def seed_reviewimages():

    for review_id in range(1, 117):
        reviewImg = requests.get(
            f"https://picsum.photos/300/300.jpg?random={random.randint(1,1000)}")
        if reviewImg.status_code == 200:
            newRevImg = reviewImg.url
        for _ in range(random.randint(1, 3)):
            # newRevImg = "https://picsum.photos/300/300.jpg"
            new_review_image = ReviewImage(
                review_id=review_id,
                image_url=newRevImg,
            )
            db.session.add(new_review_image)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviewimages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM review_images"))

    db.session.commit()
