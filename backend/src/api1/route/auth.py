from flask import request, jsonify
from flask_restx import Namespace, Resource
from ..schema.user import signup_serializer, login_serializer, UserSchema

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