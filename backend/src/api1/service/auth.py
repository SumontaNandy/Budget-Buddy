from werkzeug.exceptions import Conflict, BadRequest
from werkzeug.security import generate_password_hash, check_password_hash
from http import HTTPStatus
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
import uuid

from ..model.user import User


def get_new_user_id():
    id = str(uuid.uuid4())
    while True:
        if User.query.get(id) is None:
            return id
        else:
            id = str(uuid.uuid4())


def create_new_user_controller(data):
    try:
        id = get_new_user_id()

        new_user = User(id=id, email=data.get("email"), password=generate_password_hash(data.get("password")))
        new_user.add()

        return HTTPStatus.CREATED
    except Exception as e:
        print(str(e))
        raise Conflict(f"User with email {data.get('email')} exists")


def user_login_controller(data):
    email = data.get('email')
    password = data.get('password')

    print(data)

    user = User.query.filter_by(email=email).first()

    print(user.id)

    if (user is not None) and check_password_hash(user.password, password):
        
        access_token = create_access_token(identity=user.id, fresh=True)
        refresh_token = create_refresh_token(identity=user.id)

        tokens = {
            'access_token': access_token,
            'refresh_token': refresh_token
        }

        return tokens, HTTPStatus.OK
    
    raise BadRequest("Invalid Username or Password")