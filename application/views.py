from flask import current_app as app, jsonify, request, render_template
from flask_security import auth_required, roles_required
from werkzeug.security import check_password_hash
from flask_restful import marshal, fields
from .models import User, Role, db, Service
from .security import datastore


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
    "active": fields.Boolean
}

# for admin to see all users
@app.get('/users')
@auth_required("token")
@roles_required("admin")
def all_users():
    users = User.query.all()
    if len(users) == 0:
        return jsonify({"message": "No User Found !"}),404
    return marshal(users, user_fileds)

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