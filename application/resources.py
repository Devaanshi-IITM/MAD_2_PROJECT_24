from flask_restful import Resource, Api, reqparse, marshal_with, fields
from application.models import db, Service  # Ensure correct import
from flask import Flask

# Create an Api instance (ensure this is created in the context of your Flask app)
api = Api(prefix='/api')

# Parser for incoming JSON data
parser = reqparse.RequestParser()
parser.add_argument('name', type=str, help='Name should be a string', required=True)
parser.add_argument('price', type=float, help='Price should be a float value', required=True)
parser.add_argument('duration', type=str, help='Duration should be a string', required=True)
parser.add_argument('description', type=str, help='Description should be a string', required=True)

# Define fields for marshalling
service_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'price': fields.Float,
    'duration': fields.String,
    'description': fields.String
}

class AllServices(Resource):
    @marshal_with(service_fields)
    def get(self):
        all_services = Service.query.all()
        return all_services
    
    def post(self):
        args = parser.parse_args()
        service = Service(**args)
        db.session.add(service)
        db.session.commit()
        return {"message": "Service created successfully!"}, 201

# Register the resource with the API
api.add_resource(AllServices, '/services')  # Note that 'AllServices' should be the resource, not 'Service'
