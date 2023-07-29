from flask import request
from flask_restx import Namespace, Resource, fields

from .controllers import *

api = Namespace('account', description="User's bank account related operations")

@api.route('/')
# @api.param()
# @api.response()
class AccountList(Resource):
    # @api.doc('list_users')
    # @api.marshal_list_with(user)
    def get(self):
        '''
        get user bank account list
        '''
        return "hello from bank list"