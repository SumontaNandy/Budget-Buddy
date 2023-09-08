from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request

from ..utils.authorize import authorize
from ..utils.expect import expect

from ..schema.onetime_expense import onetime_expense_serializer, onetime_expense_list_serializer

from ..service.onetime_expense import *

from ..model.spending_plan import SpendingPlan

api = Namespace('onetime-spending-plan', description="User's onetime-spending-plan related operations")


@api.route('/')
class OneTimeExpenseCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all one-time spending_plans' list
        """
        user_id = get_jwt_identity()
        filters = request.args

        data, http_response = OneTimeExpenseUtil().get_one_time_expense_list(user_id, filters)

        return onetime_expense_list_serializer.dump(data), http_response
    
    @expect(onetime_expense_serializer)
    @jwt_required()
    def post(self):
        """
            adds a new one-time spending_plan to the user
        """
        user_id = get_jwt_identity()
        data = api.payload

        http_response = OneTimeExpenseUtil().create_one_time_expense(user_id, data)

        return http_response
    

@api.route('/<string:spending_plan_id>')
class iOneTimeExpenseRUD(Resource):
    method_decorators = [authorize(SpendingPlan), jwt_required()]

    def get(self, spending_plan_id):
        """
            get a one-time spending_plan's details with an spending_plan_id
        """
        data, http_response = OneTimeExpenseUtil(spending_plan_id).get_one_time_expense()

        return onetime_expense_serializer.dump(data), http_response
    
    @expect(onetime_expense_serializer)
    def put(self, spending_plan_id):
        """
            updates a one-time spending_plan's details with an spending_plan_id
        """
        data = api.payload

        http_response = OneTimeExpenseUtil(spending_plan_id).update_one_time_expense(data)

        return http_response
    
    def delete(self, spending_plan_id):
        """
            deletes a one-time spending_plan with an spending_plan_id
        """
        pass