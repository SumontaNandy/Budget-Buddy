from flask import request
from flask_restx import Namespace, Resource, fields

from .controllers import *

api = Namespace('auth', description='User authentication related operations')

name_model = api.model('Name', {
    'first_name': fields.String(default=None),
    'middle_initial': fields.String(default=None),
    'last_name': fields.String(default=None),
})

address_model = api.model('Address', {
    'village_house': fields.String(default=None),
    'road_block_sector': fields.String(default=None),
    'police_station': fields.String(default=None),
    'post_office': fields.String(default=None),
    'post_code': fields.String(default=None),
    'district': fields.String(default=None),
})

signup_model = api.model('SignUp', {
    'email': fields.String(required=True),
    'user': fields.Nested(name_model),
    'spouse': fields.Nested(name_model),
    'father': fields.Nested(name_model),
    'mother': fields.Nested(name_model),
    'permanent_address': fields.Nested(address_model),
    'present_address': fields.Nested(address_model),
    'contact_no': fields.String(default=None),
    'nid': fields.String(default=None),
    'tin': fields.String(default=None),
    'dob': fields.DateTime(default=None),
    'img': fields.String(default=None),
})

@api.route('/signup')
# @api.param()
# @api.response()
class SignUp(Resource):
    # @api.marshal_list_with(user)
    @api.expect(signup_model, validate=True)
    def post(self):
        """
            create a new user
        """
        data = request.get_json()
        
        new_user, http_response = create_new_user_controller(data)

        print(f'from sign up {new_user}')

        # return new_user, http_response
        return http_response
    

@api.route('/login')
class Login(Resource):
    def get(self):
        pass

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