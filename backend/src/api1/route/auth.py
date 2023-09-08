from flask import request
from flask_restx import Namespace, Resource
from ..schema.user import signup_serializer, login_serializer

from ..utils.expect import expect
from ..utils.serialize import serialize
from ..utils.authorize import authorize

from ..service.auth import *

api = Namespace('auth', description='user authentication Related operations')


@api.route('/signup')
class SignUp(Resource):
    @expect(signup_serializer)
    def post(self):
        """
            create a new user
        """
        data = api.payload

        http_response = create_new_user_controller(data=data)

        return http_response
    

@api.route('/login')
class Login(Resource):
    @expect(login_serializer)
    def post(self):
        """
            handles user login, generated a JWT
        """
        data = request.get_json()
        
        tokens, http_response = user_login_controller(data)

        return tokens, http_response
    

@api.route('/refresh')
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        id = get_jwt_identity()

        access_token = create_access_token(identity=id, fresh=True)

        return {'access_token': access_token}, HTTPStatus.OK