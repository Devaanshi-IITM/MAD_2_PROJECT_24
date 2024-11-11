from flask import current_app as app, jsonify, request, render_template
from flask_security import auth_required, roles_required
from werkzeug.security import check_password_hash, generate_password_hash
from flask_restful import marshal, fields
from .models import User, Role, db, Service, Professional, Customer
from .security import datastore
from datetime import datetime

@app.get('/')
def home():
    return render_template("index.html")

# admin
@app.get('/admin')
@auth_required("token")
@roles_required("admin")
def admin():
    return "Hello Admin"


# Allow admin to activate professional id
@app.get('/activate/professional/<int:prof_id>')
@auth_required("token")
@roles_required("admin")
def activate_instructor(prof_id):
    professional = User.query.get(prof_id)
    if not professional or "professional" not in professional.roles:
        return jsonify({"message": "Professional not found"}), 404

    professional.active = True
    db.session.commit()
    return jsonify({"message": "User Activated"})


# user login
@app.post('/user-login')
def user_login():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({"message": "email not provided"}), 400

    user = datastore.find_user(email=email)

    if not user:
        return jsonify({"message": "User Not Found"}), 404

    if check_password_hash(user.password, data.get("password")):
        return jsonify({"token": user.get_auth_token(), "email": user.email, "role": user.roles[0].name})
    else:
        return jsonify({"message": "Wrong Password"}), 400

# to serialize users data
user_fileds = {
    "id": fields.Integer,
    "email": fields.String,
    "active": fields.Boolean,
    "role": fields.List(fields.String),
}

#Registration route for professional
@app.route('/register/prof', methods=['POST'])
def prof_register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    service_name = data.get('service_name')
    experience = data.get('experience')
    document = data.get('document')
    contact = data.get('contact')
    address = data.get('address')
    pincode = data.get('pincode')

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    current_user = User.query.filter_by(email=email).first()
    if current_user:
        return jsonify({"message": "User already exists."}), 400

    # Create a new professional
    new_user = app.security.datastore.create_user(
        email=email,
        password=generate_password_hash(password),
        active=False,  # False for professionals
    )
    
    
    db.session.commit() 

    # Create the Professional record
    new_prof = Professional(
        prof_id=new_user.id,
        name=name,
        registration_date=datetime.now(),
        service_name=service_name,
        experience=experience,
        document=document,
        contact=contact,
        address=address,
        pincode=pincode,
    )
    db.session.add(new_prof)

    # Add role to the user
    user_role = Role.query.filter_by(name='professional').first()
    if user_role:
        new_user.roles.append(user_role)

    db.session.commit()

    return jsonify({"message": "Professional registered successfully!"}), 201

#Register customer 
@app.route('/register/customer', methods=['POST'])
def customer_register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    contact = data.get('contact')
    address = data.get('address')
    pincode = data.get('pincode')

    if not email or not password:
        return jsonify({"message": "Email and password can not be blank"})
    
    current_user = User.query.filter_by(email=email).first()
    if current_user:
        return jsonify({"message": "User already exists."}), 400

    # Create a new user
    new_user = app.security.datastore.create_user(
        email=email,
        password=generate_password_hash(password),
        active=True,  # sctive is true for customers
    )
    
    db.session.add(new_user)
    db.session.commit() 

    # Create the Customer record
    new_customer = Customer(
        customer_id=new_user.id,
        name=name,
        contact=contact,
        address=address,
        pincode=pincode,
    )
    db.session.add(new_customer)

    # Add role to the user
    user_role = Role.query.filter_by(name='customer').first()
    if user_role:
        new_user.roles.append(user_role)
    db.session.commit()

    return jsonify({"message": "Registered successfully!"}), 201


# for admin to see all users
@app.get('/users')
@auth_required("token")
@roles_required("admin")
def all_users():
    users = User.query.all()
    if not users:
        return jsonify({"message": "No User Found !"}),404
    
    users_data = []
    for user in users:
        user_info = {
            'id' : user.id,
            'email' : user.email,
            'active' : user.active,
            'role' : [role.name for role in user.roles]
        }
        users_data.append(user_info)
    
    return jsonify(users_data)

# for customer to request a service
@app.get('/service/<int:id>/request')
@auth_required("token")
@roles_required("customer")
def request_service(id):
    service = Service.query.get(id)
    if not service:
        return jsonify({"message": "Service not found"}), 404
    else:
        return jsonify({"message": "Service request successful"}), 200