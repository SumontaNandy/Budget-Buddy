from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..utils.authorize import authorize
from ..utils.expect import expect

from ..schema.account import account_ip_serializer, account_op_serializer

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

        http_response = create_account_controller(user_id, data)

        return http_response
    

@api.route('/<string:account_id>')
class iAccountRUD(Resource):
    method_decorators = [authorize(Account), jwt_required()]

    def get(self, account_id):
        """
            get an account's details with an account_id
        """
        data, http_response = get_account_controller(account_id)

        return account_op_serializer.dump(data), http_response

    @expect(account_ip_serializer)
    def put(self, account_id):
        """
            updates an account's details with an account_id
        """
        data = api.payload
        data, http_response = update_account_controller(account_id, data)

        return account_op_serializer.dump(data), http_response
    
    def delete(self, account_id):
        """
            deletes an account with an account_id
        """
        pass