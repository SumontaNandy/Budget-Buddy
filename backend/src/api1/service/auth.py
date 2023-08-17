from werkzeug.exceptions import Conflict, BadRequest
from http import HTTPStatus
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

        new_user = User(id=id, email=data.get("email"), password=data.get("password"))
        new_user.add()

        return HTTPStatus.CREATED
    except Exception as e:
        print(str(e))
        raise Conflict(f"User with email {data.get('email')} exists")
