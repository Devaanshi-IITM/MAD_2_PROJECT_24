from flask import Flask
from application.models import db, Role, User
from config import DevelopmentConfig
from application.resources import api

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    db.init_app(app) # integrating flask with sqlalchemy
    api.init_app(app)
    with app.app_context(): # import form views
        import application.views

    return app


app = create_app() # creates an instance of flask app
    
if __name__ == '__main__':
    app.run(debug=True )