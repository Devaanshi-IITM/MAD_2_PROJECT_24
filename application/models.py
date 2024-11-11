from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin
from datetime import datetime

db = SQLAlchemy()

class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer, db.ForeignKey('role.id'))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, unique = True)
    password = db.Column(db.String, nullable = False)
    active = db.Column(db.Boolean(), default = True)
    fs_uniquifier = db.Column(db.String, unique = True)
    is_flagged = db.Column(db.Boolean(), default = False)
    roles = db.Relationship('Role', secondary = 'roles_users', backref = db.backref('users', lazy = 'dynamic'))
    
   
class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique = True, nullable = False)
    description = db.Column(db.String, nullable = False)

class Professional(db.Model):
    id =  db.Column(db.Integer, primary_key = True)
    prof_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False) 
    name = db.Column(db.String)
    registration_date = db.Column(db.DateTime, index = True, default = datetime.now())
    service_name = db.Column(db.String)
    experience = db.Column(db.Float)
    document = db.Column(db.String)
    contact = db.Column(db.Integer)
    address = db.Column(db.String, nullable = False)
    pincode = db.Column(db.Integer, nullable = False)
    user = db.Relationship('User', backref = 'professional')

class Customer(db.Model):
    id =  db.Column(db.Integer, autoincrement=True, primary_key = True)
    customer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False) 
    name = db.Column(db.String)
    contact = db.Column(db.Integer)
    address = db.Column(db.String, nullable = False)
    pincode = db.Column(db.Integer, nullable = False)
    user = db.Relationship('User', backref = 'customer')

class Service(db.Model):
    id = db.Column(db.Integer, autoincrement=True, primary_key = True)
    name = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)
    duration = db.Column(db.String, nullable = False)
    description = db.Column(db.String)

class ServiceRequest():
    id = db.Column(db.Integer, autoincrement=True, primary_key = True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'))
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
    professional_id = db.Column(db.Integer, db.ForeignKey('professional.id'))
    request_date = db.Column(db.DateTime, index = True, default = datetime.now())
    servicing_date = db.Column(db.DateTime, nullable=False)
    service_status = db.Column(db.String, default = 'requested')
    remarks = db.Column(db.String(250))

class Review(db.Model):
    id = db.Column(db.Integer, autoincrement=True, primary_key = True)
    professional_id = db.Column(db.Integer, db.ForeignKey('professional.id'))
    cust_id  = db.Column(db.Integer, db.ForeignKey('customer.id'))
    rating = db.Column(db.Float)
    review_text = db.Column(db.String(250))
    professional = db.Relationship('Professional', backref ='reviews')
    customer = db.Relationship('Customer', backref ='reviews')