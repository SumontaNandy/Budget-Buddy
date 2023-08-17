from flask import Blueprint
from flask_restx import Api

from .route.auth import api as ns_auth
from .route.account_type import api as ns_account_type
from .route.account import api as ns_account

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


api.add_namespace(ns_auth, path='/auth')
api.add_namespace(ns_account_type, path='/account-types')
api.add_namespace(ns_account, path='/account')