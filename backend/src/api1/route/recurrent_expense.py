from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request

from ..utils.authorize import authorize
from ..utils.expect import expect

from ..schema.recurrent_expense import recurrent_expense_serializer, recurrent_expense_list_serializer

from ..service.recurrent_expense import *

from ..model.spending_plan import SpendingPlan

api = Namespace('recurrent-spending-plan', description="User's recurrent-spending-plan related operations")


@api.route('/')
class RecurrentExpenseCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all recurrent spending_plans' list
        """
        user_id = get_jwt_identity()
        filters = request.args

        data, http_response = RecurrentExpenseUtil().get_recurrent_expense_list(user_id, filters)

        return recurrent_expense_list_serializer.dump(data), http_response
    
    @expect(recurrent_expense_serializer)
    @jwt_required()
    def post(self):
        """
            adds a recurrent new spending_plan to the user
        """
        user_id = get_jwt_identity()
        data = api.payload

        http_response = RecurrentExpenseUtil().create_recurrent_expense(user_id, data)
        return http_response
    

@api.route('/<string:spending_plan_id>')
class iRecurrentExpenseRUD(Resource):
    method_decorators = [authorize(SpendingPlan), jwt_required()]

    def get(self, spending_plan_id):
        """
            get a recurrent spending_plan's details with an spending_plan_id
        """
        data, http_response = RecurrentExpenseUtil(spending_plan_id).get_recurrent_expense()
        # pass
        return recurrent_expense_serializer.dump(data), http_response
    
    @expect(recurrent_expense_serializer)
    def put(self, spending_plan_id):
        """
            updates a recurrent spending_plan's details with an spending_plan_id
        """
        data = api.payload

        http_response = RecurrentExpenseUtil(spending_plan_id).update_recurrent_expense(data)
        
        return http_response
    
    def delete(self, spending_plan_id):
        """
            deletes a recurrent spending_plan with an spending_plan_id
        """
        pass