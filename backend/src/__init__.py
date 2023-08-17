from flask import Flask
from config import config_dict

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_mode):
    app = Flask(__name__)
    app.config.from_object(config_dict[config_mode])

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    return app