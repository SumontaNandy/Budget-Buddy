from flask import Blueprint
from flask_restx import Api

from .user.urls import api as ns_user
from .account.urls import api as ns_account

blueprint = Blueprint('api1', __name__, url_prefix='/api/1/user')

api = Api(blueprint,
          version='1.0',
          doc='/docs')

api.add_namespace(ns_user, path='/info')
api.add_namespace(ns_account, path='/account')