from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request

from ..utils.authorize import authorize
from ..utils.expect import expect

from ..schema.goal import goal_serializer, goal_list_serializer

from ..service.goal import *

from ..model.goal import Goal

api = Namespace('goal', description="User's goal related operations")


@api.route('/')
class GoalCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all goals' list
        """
        user_id = get_jwt_identity()
        filters = request.args

        data, http_response = GoalUtil().get_goal_list(user_id, filters)

        return goal_list_serializer.dump(data), http_response
    
    @expect(goal_serializer)
    @jwt_required()
    def post(self):
        """
            adds a new goal to the user
        """
        user_id = get_jwt_identity()
        data = api.payload

        print(data)

        http_response = GoalUtil().create_goal(user_id, data)

        return http_response
    

@api.route('/<goal_id>')
class iWatchlistRUD(Resource):
    method_decorators = [authorize(Goal), jwt_required()]

    def get(self, goal_id):
        """
            get a goal's details with an goal_id
        """
        data, http_response = GoalUtil(goal_id).get_goal()

        return goal_serializer.dump(data), http_response
    
    @expect(goal_serializer)
    def put(self, goal_id):
        """
            updates a goal's details with an goal_id
        """
        data = api.payload

        http_response = GoalUtil(goal_id).update_goal(data)
        
        return http_response
    
    def delete(self, goal_id):
        """
            deletes a goal with an goal_id
        """
        pass