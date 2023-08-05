from functools import update_wrapper
from werkzeug.exceptions import Forbidden
from flask_jwt_extended import get_jwt_identity


def authorize(className):
    def decorator(func):
        def wrapped_function(*args, **kwargs):
            owner_id = className.get_owner(kwargs[next(iter(kwargs))])
            user_id = get_jwt_identity()
            
            if owner_id != user_id:
                raise Forbidden(description="User is not authorized")
            
            return func(*args, **kwargs)
        return update_wrapper(wrapped_function, func)
    return decorator