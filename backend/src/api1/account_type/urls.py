from flask import request, abort
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..utils.authorization import authorize

from .controllers import *

api = Namespace('account-types', description="User's bank account-types related operations")

account_type_model = api.model('AccountType', {
    "id": fields.String,
    "name": fields.String
})

account_model = api.model('Account', {
    "id": fields.String,
    "name": fields.String(attribute='account_name'),
    "balance": fields.Float
})

ith_account_type_model = api.model('iAccountType', {
    "parent": fields.List(fields.Nested(account_type_model)),
    "child": fields.List(fields.Nested(account_type_model)),
    "accounts": fields.List(fields.Nested(account_model))
})

@api.route('/')
class AccountTypeR(Resource):
    @api.marshal_list_with(account_type_model)
    @jwt_required()
    def get(self):
        """
            get all account-types available [level 1]
        """
        data, http_response = get_account_types_controller() 

        return data, http_response


@api.route('/<account_type_id>')
class iAccountTypeR(Resource):
    @api.marshal_with(ith_account_type_model)
    @jwt_required()
    def get(self, account_type_id):
        """
            get accounts of a type
        """
        user_id = get_jwt_identity()
        data, http_response = get_accounts_of_a_type_controller(user_id, account_type_id)
        
        return data, http_response
