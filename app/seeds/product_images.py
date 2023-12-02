from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text
import random
import requests


def seed_product_images():

    for product_id in range(1, 40):
        # Generate 4 images with preview value as false
        fImage = requests.get(
            f"https://picsum.photos/600/600.jpg?random={random.randint(501,1001)}")
        if fImage.status_code == 200:
            falseImageUrl = fImage.url
        for _ in range(4):
            new_false_preview_image = ProductImage(
                product_id=product_id, image_url=falseImageUrl, preview=False)
            db.session.add(new_false_preview_image)

        # Generate 1 image with preview true
        image = requests.get(
            f"https://picsum.photos/600/600.jpg?random={random.randint(1,500)}")

        if image.status_code == 200:
            true_image_url = image.url

        new_true_preview_image = ProductImage(
            product_id=product_id, image_url=true_image_url, preview=True)
        db.session.add(new_true_preview_image)

    db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
