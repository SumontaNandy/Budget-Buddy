from flask import request
from flask_restx import Namespace, Resource
from flask_rest_serializer import serialize_with_schemas
from ..schema.user import signup_serializer, login_serializer, UserSchema

api = Namespace('auth', description='user authentication Related operations')

@api.route('/signup')
class SignUp(Resource):
    @serialize_with_schemas(request_schema=signup_serializer)
    def post(self):
        print(api.payload)
        return {
            "email": "hi",
            "password": "123"
        }