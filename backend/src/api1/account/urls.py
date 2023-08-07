from flask import request, abort, redirect, url_for
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..utils.authorization import authorize

from .controllers import *

api = Namespace('account', description="User's bank account related operations")

account_ip_model = api.model('Account', {
    "account_no": fields.String,
    "account_name": fields.String,
    "balance": fields.Float(required=True),
    "date": fields.DateTime(),
    "account_type_id": fields.String(required=True)
})

balance_segment_model = api.model('BalanceSegment', {
    "segment_name": fields.String,
    "amount": fields.Float
}) 

account_op_model = api.model('Account', {
    "account_id": fields.String(attribute='id'),
    "account_no": fields.String,
    "account_name": fields.String,
    "balance": fields.Float,
    "date": fields.DateTime(),
    "account_type_name": fields.String,
    "segment_list": fields.List(fields.Nested(balance_segment_model))
})


@api.route('/')
class AccountCR(Resource):  
    @api.expect(account_ip_model)
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

    @api.marshal_with(account_op_model)
    def get(self, account_id):
        """
            get an account's details with an account_id
        """
        data, http_response = get_account_controller(account_id)

        return data, http_response

    @api.marshal_with(account_op_model)
    @api.expect(account_ip_model)
    def put(self, account_id):
        """
            updates an account's details with an account_id
        """
        data = api.payload
        data, http_response = update_account_controller(account_id, data)

        return data, http_response
    
    def delete(self, account_id):
        """
            deletes an account with an account_id
        """
        pass
