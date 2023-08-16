from flask import Blueprint
from flask_restx import Api

blueprint = Blueprint('api1', __name__, url_prefix='/api/1/user')

authorizations = {
    "Bearer Auth": {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization',
    }
}

api = Api(blueprint,
          version='1.0',
          title='Budget Buddy API',
          authorizations=authorizations,
          security='Bearer Auth',
          doc='/docs')