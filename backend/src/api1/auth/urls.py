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
    'password': fields.String(required=True),
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
        http_response = create_new_user_controller(data)

        return http_response


login_model = api.model('LogIn', {
    'email': fields.String(required=True),
    'password': fields.String(required=True)
}) 

@api.route('/login')
class Login(Resource):
    @api.expect(login_model, validate=True)
    def post(self):
        """
            handles user login, generates a JWT 
        """
        data = request.get_json()
        tokens, http_response = user_login_controller(data)

        return tokens, http_response
    

@api.route('/refresh')
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        id = get_jwt_identity()

        access_token = create_access_token(identity=id)

        return {'access_token': access_token}, HTTPStatus.OK
