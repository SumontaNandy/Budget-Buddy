from flask import request, abort
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from http import HTTPStatus
from functools import wraps

from .controllers import *

api = Namespace('account', description="User's bank account related operations")


def basic_authorization(account_no):
    return True


def authorize(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not getattr(func, 'authorized', True):
            return func(*args, **kwargs)

        user_id = get_jwt_identity()
        acct = account_authorization_controller(user_id, kwargs['account_no']) 

        if acct:
            return func(*args, **kwargs)

        abort(HTTPStatus.UNAUTHORIZED)
    return wrapper


account_model = api.model('Account', {
    "account_no": fields.String(required=True),
    "account_no": fields.String(required=True),
    "balance": fields.Float(required=True),
    "date": fields.DateTime(),
    "account_type": fields.String(required=True)
})

@api.route('/')
class AccountCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all accounts' list
        """
        pass
    
    @api.expect(account_model)
    @jwt_required()
    def post(self):
        """
            adds a new account to the user
        """
        user_id = get_jwt_identity()
        data = api.payload

        http_response = create_account_controller(user_id, data)

        return http_response
    

@api.route('/<string:account_no>')
class iAccountRUD(Resource):
    @authorize
    @jwt_required()
    def get(self, account_no):
        """
            get an account's details with an account_no
        """
        pass
    
    @jwt_required()
    def put(self, account_no):
        """
            updates an account's details with an account_no
        """
        pass
    
    @jwt_required()
    def delete(self, account_no):
        """
            deletes an account with an account_no
        """
        pass
