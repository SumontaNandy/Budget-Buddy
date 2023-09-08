from flask import request
from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..utils.authorize import authorize
from ..utils.expect import expect
from ..utils.serialize import serialize

from ..schema.account_type import account_type_serializer, account_type_tree_serializer

from ..service.account_type import *

api = Namespace('account-types', description="User's bank account-types related operations")


@api.route('/')
class AccountTypeR(Resource):
    @jwt_required()
    def get(self):
        """
            get all account-types available
        """
        filters = request.args
        data, http_response = AccountTypeUtil().get_account_types(filters=filters)
        
        return account_type_serializer.dump(data), http_response
    

@api.route('/<account_type_id>')
class iAccountTypeR(Resource):
    @jwt_required()
    def get(self, account_type_id):
        """
            get accounts of a type
        """
        user_id = get_jwt_identity()
        data, http_response = AccountTypeUtil(account_type_id).get_accounts_tree(user_id=user_id)
       
        return account_type_tree_serializer.dump(data), http_response