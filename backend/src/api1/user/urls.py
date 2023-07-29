from flask import request
from flask_restx import Namespace, Resource, fields

from .controllers import *

api = Namespace('info', description='User info management related operations')

# user = api.model('User', {
#     'id': fields.String(required=True, description='User identifier'),
#     'name': fields.String(required=True, description='User name'),
# })

@api.route('/')
# @api.param()
# @api.response()
class User(Resource):
    # @api.doc('list_users')
    # @api.marshal_list_with(user)
    def get(self):
        '''
        get a user info
        '''
        return "hello from user list"

# @api.route('/', methods=['GET', 'POST'])
# def list_create_users():
#     if request.method == 'GET':
#         return 'get list create users'
#         # return list_all_users_controller()
#     elif request.method == 'POST':
#         return 'get list create users'
#         # return create_user_controller()
    
#     return 'Method is not allowed'


# @api.route('/<user_id>', methods=['GET', 'PUT', 'DELETE'])
# def retrieve_update_destroy_users(user_id):
#     if request.method == 'GET':
#         # return retrive_user_controller(user_id)
#         return 'get retrieve'
#     elif request.method == 'PUT':
#         # return update_user_controller(user_id)
#         return 'put update'
#     elif request.method == 'DELETE':
#         # return delete_user_controller(user_id)
#         return 'delete destroy'
    
#     return 'Method is not allowed'