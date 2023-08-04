from flask import request, abort
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from http import HTTPStatus
from functools import wraps

from .controllers import *

api = Namespace('spending-plan', description="User's spending-plan related operations")


def authorize(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not getattr(func, 'authorized', True):
            return func(*args, **kwargs)

        user_id = get_jwt_identity()
        acct = spending_plan_authorization_controller(user_id, kwargs[next(iter(kwargs))]) 

        if acct:
            return func(*args, **kwargs)

        abort(HTTPStatus.UNAUTHORIZED)
    return wrapper


@api.route('/')
class SpendingPlanCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all spending_plans' list
        """
        pass
    
    @jwt_required()
    def post(self):
        """
            adds a new spending_plan to the user
        """
        pass
    

@api.route('/<string:spending_plan_id>')
class iSpendingPlanRUD(Resource):
    @authorize
    @jwt_required()
    def get(self, spending_plan_id):
        """
            get an spending_plan's details with an spending_plan_id
        """
        pass
    
    @authorize
    @jwt_required()
    def put(self, spending_plan_id):
        """
            updates an spending_plan's details with an spending_plan_id
        """
        pass
    
    @authorize
    @jwt_required()
    def delete(self, spending_plan_id):
        """
            deletes an spending_plan with an spending_plan_id
        """
        pass
