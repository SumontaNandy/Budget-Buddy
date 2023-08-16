from flask import Flask
from config import config_dict

def create_app(config_mode):
    app = Flask(__name__)
    app.config.from_object(config_dict[config_mode])

    return app