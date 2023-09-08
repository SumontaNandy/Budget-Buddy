from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request

from ..utils.authorize import authorize
from ..utils.expect import expect

from ..schema.account import account_ip_serializer, account_op_serializer, account_list_serializer
from ..schema.deposite import deposite_serializer, deposite_list_serializer

from ..service.account import *

from ..model.account import Account

api = Namespace('account', description="User's bank account related operations")

@api.route('/')
class AccountCR(Resource):  
    @expect(account_ip_serializer)
    @jwt_required()
    def post(self):
        """
            adds a new account to the user
        """
        user_id = get_jwt_identity()
        data = api.payload

        http_response = AccountUtil().create_account(user_id, data)

        return http_response
    
    @jwt_required()
    def get(self):
        """
            returns all the accounts of a user
        """
        user_id = get_jwt_identity()

        data, http_response = AccountUtil().get_accounts(user_id)

        return account_list_serializer.dump(data), http_response

@api.route('/<account_id>')
class iAccountRUD(Resource):
    method_decorators = [authorize(Account), jwt_required()]

    def get(self, account_id):
        """
            get an account's details with an account_id
        """
        data, http_response = AccountUtil(account_id).get_account()

        return account_op_serializer.dump(data), http_response

    @expect(account_ip_serializer)
    def put(self, account_id):
        """
            updates an account's details with an account_id
        """
        data = api.payload
        data, http_response = AccountUtil(account_id).update_account(data)

        return account_op_serializer.dump(data), http_response
    
    def delete(self, account_id):
        """
            deletes an account with an account_id
        """
        pass


@api.route('/<account_id>/deposite')
class Deposite(Resource):
    method_decorators = [authorize(Account), jwt_required()]

    def get(self, account_id):
        """
            get deposite history of an account with an account_id
        """
        filters = request.args
        data, http_response = AccountUtil(account_id).get_deposite_history(filters)

        print(data)

        return deposite_list_serializer.dump(data), http_response

    @expect(deposite_serializer)
    def post(self, account_id):
        """
            deposite money to an account with an account_id
        """
        data = api.payload
        http_response = AccountUtil(account_id).deposite(data)

        return http_response
    