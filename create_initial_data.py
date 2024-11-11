from app import app
from application.security import datastore
from application.models import db, Role, User
from flask_security import hash_password
from werkzeug.security import generate_password_hash

with app.app_context():
    #db.session.query(User).delete()
    #db.session.query(Role).delete()
    #db.session.commit()
    db.create_all()
    datastore.find_or_create_role(name="admin", description="User is an admin")
    datastore.find_or_create_role(name="professional", description="User is a Professional")
    datastore.find_or_create_role(name="customer", description="User is a Customer")
    db.session.commit()
    if not datastore.find_user(email="admin@email.com"):
        datastore.create_user(email="admin@email.com", password=generate_password_hash("admin"), roles=["admin"])
    if not datastore.find_user(email="prof@email.com"):
        datastore.create_user(email="prof@email.com", password=generate_password_hash("prof"), roles=["professional"], active=False)
    if not datastore.find_user(email="customer@email.com"):
        datastore.create_user(email="customer@email.com",password=generate_password_hash("customer"), roles=["customer"])

    db.session.commit()