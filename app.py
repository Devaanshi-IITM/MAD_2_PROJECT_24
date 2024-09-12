from flask import Flask
from flask_security import SQLAlchemyUserDatastore, Security
from application.models import db, Role, User
from config import DevelopmentConfig
from application.resources import api
from application.security import datastore

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    db.init_app(app) # integrating flask with sqlalchemy
    api.init_app(app)
    app.security = Security(app, datastore) # creating security instance
    with app.app_context(): # import form views
        import application.views

    return app


app = create_app() # creates an instance of flask app
    
if __name__ == '__main__':
    app.run(debug=True )