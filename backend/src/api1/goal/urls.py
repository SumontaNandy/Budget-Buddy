from flask import request, abort
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from http import HTTPStatus
from functools import wraps

from .controllers import *

api = Namespace('goal', description="User's goal related operations")

@api.route('/')
class GoalCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all goals' list
        """
        pass
    
    @jwt_required()
    def post(self):
        """
            adds a new goal to the user
        """
        pass
    

@api.route('/<string:goal_id>')
class iGoalRUD(Resource):
    @jwt_required()
    def get(self, goal_id):
        """
            get an goal's details with an goal_id
        """
        pass
    
    @jwt_required()
    def put(self, goal_id):
        """
            updates an goal's details with an goal_id
        """
        pass
    
    @jwt_required()
    def delete(self, goal_id):
        """
            deletes an goal with an goal_id
        """
        pass
