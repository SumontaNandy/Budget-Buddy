from flask import request, abort
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from http import HTTPStatus
from functools import wraps
from ..utils.authorization import authorize

from .controllers import *
from .models import RecurrentType, RecurrentFreq

api = Namespace('spending-plan', description="User's spending-plan related operations")


one_ip_model = api.model('OneTimeExpense', {
    "name": fields.String(required=True),
    "amount": fields.Float(required=True)
})

one_op_model = api.model('OneTimeExpense', {
    "id": fields.String,
    "name": fields.String,
    "amount": fields.Float,
    "amount_left": fields.Float
})

recur_ip_model = api.model('RecurrentExpense', {
    "name": fields.String(required=True),
    "amount": fields.Float(required=True),
    "next_date": fields.DateTime(required=True),
    "end_date": fields.DateTime(),
    "frequency": fields.String(enum=RecurrentFreq._member_names_, required=True),
    "type": fields.String(enum=RecurrentType._member_names_, required=True)
})

recur_op_model = api.model('RecurrentExpense', {
    "id": fields.String,
    "name": fields.String,
    "amount": fields.Float,
    "next_date": fields.DateTime,
    "end_date": fields.DateTime,
    "frequency": fields.String(attribute=lambda x: x.frequency.value),
    "type": fields.String(attribute=lambda x: x.type.value)
})

@api.route('/one/')
class OneTimeExpenseCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all one-time spending_plans' list
        """
        pass
    
    @api.expect(one_ip_model)
    @jwt_required()
    def post(self):
        """
            adds a new one-time spending_plan to the user
        """
        user_id = get_jwt_identity()
        data = api.payload

        http_response = create_one_time_expense_controller(user_id, data)

        return http_response
    

@api.route('/one/<string:spending_plan_id>')
class iOneTimeExpenseRUD(Resource):
    method_decorators = [authorize(SpendingPlan), jwt_required()]

    @api.marshal_with(one_op_model)
    def get(self, spending_plan_id):
        """
            get a one-time spending_plan's details with an spending_plan_id
        """
        data, http_response = get_one_time_expense_controller(spending_plan_id)

        return data, http_response
    
    @api.expect(one_ip_model)
    def put(self, spending_plan_id):
        """
            updates a one-time spending_plan's details with an spending_plan_id
        """
        data = api.payload

        http_response = update_one_time_expense_controller(spending_plan_id, data)

        return http_response
    
    def delete(self, spending_plan_id):
        """
            deletes a one-time spending_plan with an spending_plan_id
        """
        pass


@api.route('/recur/')
class RecurrentExpenseCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all recurrent spending_plans' list
        """
        pass
    
    @api.expect(recur_ip_model)
    @jwt_required()
    def post(self):
        """
            adds a recurrent new spending_plan to the user
        """
        user_id = get_jwt_identity()
        data = api.payload

        http_response = create_recurrent_expense_controller(user_id, data)

        return http_response
    

@api.route('/recur/<string:spending_plan_id>')
class iRecurrentExpenseRUD(Resource):
    method_decorators = [authorize(SpendingPlan), jwt_required()]

    @api.marshal_with(recur_op_model)
    def get(self, spending_plan_id):
        """
            get a recurrent spending_plan's details with an spending_plan_id
        """
        data, http_response = get_recurrent_expense_controller(spending_plan_id)
        # pass
        return data, http_response
    
    @api.expect(recur_ip_model)
    def put(self, spending_plan_id):
        """
            updates a recurrent spending_plan's details with an spending_plan_id
        """
        data = api.payload

        http_response = update_recurrent_expense_controller(spending_plan_id, data)
        
        return http_response
    
    def delete(self, spending_plan_id):
        """
            deletes a recurrent spending_plan with an spending_plan_id
        """
        pass