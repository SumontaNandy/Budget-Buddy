from flask import request
from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.exceptions import NotFound

from ..schema.user import info_serializer

from ..utils.expect import expect
from ..utils.save_file import *

from ..service.user import *

api = Namespace('info', description='user info related operations')
    

@api.route('/')
class UserRUD(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        """
            get a users's details with a user_id
        """
        user_id = get_jwt_identity()
        data, http_response = UserUtil(user_id).get_info()

        return info_serializer.dump(data), http_response

    @expect(info_serializer)
    def put(self):
        """
            updates a users's details with a user_id
        """
        user_id = get_jwt_identity()
        data = api.payload

        data, http_response = UserUtil(user_id).update_info(data)

        return info_serializer.dump(data), http_response
    

@api.route('/img')
class UserImg(Resource):
    method_decorators = [jwt_required()]

    def put(self):
        """
            updates a users's img with a user_id
        """
        user_id = get_jwt_identity()
        img = request.files['img']

        if img is not None:
            filename = 'profile-pic' + user_id + "." + img.filename.rsplit('.')[-1].lower()
            filename = upload_file(img, filename)

            UserUtil(user_id).update_img(filename)

        else:
            raise NotFound('No selected file')

        return HTTPStatus.OK 