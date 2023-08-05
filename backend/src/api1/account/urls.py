from flask import request, abort
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..utils.authorization import authorize

from .controllers import *

api = Namespace('account', description="User's bank account related operations")

account_model = api.model('Account', {
    "account_no": fields.String,
    "account_name": fields.String,
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
    

@api.route('/<string:account_id>')
class iAccountRUD(Resource):
    method_decorators = [authorize(Account), jwt_required()]

    def get(self, account_id):
        """
            get an account's details with an account_id
        """
        print(account_id)
        pass

    def put(self, account_id):
        """
            updates an account's details with an account_id
        """
        pass
    
    def delete(self, account_id):
        """
            deletes an account with an account_id
        """
        pass
