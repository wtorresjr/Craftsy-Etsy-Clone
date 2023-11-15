from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():
    product_image_1 = ProductImage(
        product_id=1, image_url="https://i.etsystatic.com/5514888/r/il/2325f9/3659627067/il_fullxfull.3659627067_hbwf.jpg", preview=False)
    product_image_2 = ProductImage(
        product_id=1, image_url="https://i.etsystatic.com/37417442/r/il/baa525/4149027180/il_340x270.4149027180_17vu.jpg", preview=False)
    product_image_3 = ProductImage(
        product_id=1, image_url="https://i.etsystatic.com/40417156/r/il/f41174/4641830658/il_fullxfull.4641830658_rq7e.jpg", preview=False)
    product_image_4 = ProductImage(
        product_id=2, image_url="https://spoonacular.com/images/articles/fruit-silicone-coaster-set.jpg", preview=False)
    product_image_5 = ProductImage(
        product_id=2, image_url="https://files.cults3d.com/uploaders/2141422/illustration-file/fc486606-adeb-4c97-a67e-52a0db92d048/citrus_slice_5.jpg", preview=False)
    product_image_6 = ProductImage(
        product_id=3, image_url="https://141271756.cdn6.editmysite.com/uploads/1/4/1/2/141271756/s688317355234392558_p10_i2_w1460.jpeg", preview=False)
    product_image_7 = ProductImage(
        product_id=2, image_url="https://141271756.cdn6.editmysite.com/uploads/1/4/1/2/141271756/s688317355234392558_p10_i2_w1460.jpeg", preview=True)
    product_image_8 = ProductImage(
        product_id=1, image_url="https://141271756.cdn6.editmysite.com/uploads/1/4/1/2/141271756/s688317355234392558_p10_i2_w1460.jpeg", preview=True)
    product_image_9 = ProductImage(
        product_id=3, image_url="https://141271756.cdn6.editmysite.com/uploads/1/4/1/2/141271756/s688317355234392558_p10_i2_w1460.jpeg", preview=True)

    db.session.add(product_image_1)
    db.session.add(product_image_2)
    db.session.add(product_image_3)
    db.session.add(product_image_4)
    db.session.add(product_image_5)
    db.session.add(product_image_6)
    db.session.add(product_image_7)
    db.session.add(product_image_8)
    db.session.add(product_image_9)
    db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
