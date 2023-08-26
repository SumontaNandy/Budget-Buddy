from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request

from ..utils.authorize import authorize
from ..utils.expect import expect

from ..schema.transaction import transaction_serializer, transaction_list_serializer

from ..service.transaction import *

from ..model.transaction import Transaction

api = Namespace('transaction', description="User's transaction related operations")


@api.route('/')
class TransactionCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all transactons' list
        """
        user_id = get_jwt_identity()
        filters = request.args

        data, http_response = TransactionUtil().get_transaction_list(user_id, filters)

        return transaction_list_serializer.dump(data), http_response
    
    @expect(transaction_serializer)
    @jwt_required()
    def post(self):
        """
            adds a new transaction to the user
        """
        user_id = get_jwt_identity()
        data = api.payload

        http_response = TransactionUtil().create_transaction(user_id, data);

        return http_response
    

@api.route('/<transaction_id>')
class iTransactionRUD(Resource):
    method_decorators = [authorize(Transaction), jwt_required()]

    def get(self, transaction_id):
        """
            get a transaction's details with an transaction_id
        """
        data, http_response = TransactionUtil(transaction_id).get_transaction()

        return transaction_serializer.dump(data), http_response
    
    @expect(transaction_serializer)
    def put(self, transaction_id):
        """
            updates a transaction's details with an transaction_id
        """
        data = api.payload

        http_response = TransactionUtil(transaction_id).update_transaction(data)
        
        return http_response
    
    def delete(self, transaction_id):
        """
            deletes a transaction with an transaction_id
        """
        pass