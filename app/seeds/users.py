from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    
    seedUsers = ['Demo','marnie','bobbie']
    foundUsers = []
    for user in seedUsers: 
        try:
            oldUsers = User.query.filter_by(username=user).first()
            if oldUsers:
                foundUsers.append(oldUsers)
        except:
            pass
    
    if len(foundUsers) == 0:
        demo = User(
            username='Demo', first_name='Demo', last_name='User', email='demo@aa.io', password='password')
        marnie = User(
            username='marnie', first_name='marnie', last_name='lasty', email='marnie@aa.io', password='password')
        bobbie = User(
            username='bobbie', first_name='bobbie', last_name='lasterson', email='bobbie@aa.io', password='password')

        db.session.add(demo)
        db.session.add(marnie)
        db.session.add(bobbie)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
