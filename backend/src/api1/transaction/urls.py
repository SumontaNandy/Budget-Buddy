from flask import request, abort
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from http import HTTPStatus
from functools import wraps

from .controllers import *

api = Namespace('transaction', description="User's transaction related operations")


def authorize(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not getattr(func, 'authorized', True):
            return func(*args, **kwargs)

        user_id = get_jwt_identity()
        acct = transaction_authorization_controller(user_id, kwargs[next(iter(kwargs))]) 

        if acct:
            return func(*args, **kwargs)

        abort(HTTPStatus.UNAUTHORIZED)
    return wrapper


@api.route('/')
class TransactionCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all transactions' list
        """
        pass
    
    @jwt_required()
    def post(self):
        """
            adds a new transaction to the user
        """
        pass
    

@api.route('/<string:transaction_id>')
class iTransactionRUD(Resource):
    @authorize
    @jwt_required()
    def get(self, transaction_id):
        """
            get an transaction's details with an transaction_id
        """
        pass
    
    @authorize
    @jwt_required()
    def put(self, transaction_id):
        """
            updates an transaction's details with an transaction_id
        """
        pass
    
    @authorize
    @jwt_required()
    def delete(self, transaction_id):
        """
            deletes an transaction with an transaction_id
        """
        pass
