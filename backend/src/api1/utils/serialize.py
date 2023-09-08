from flask import jsonify
from functools import wraps
from werkzeug.exceptions import InternalServerError
from http import HTTPStatus

def serialize(schema):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            response_data = func(*args, **kwargs)

            if response_data is None:
                raise InternalServerError(description='No response data')

            try:
                serialized_data = schema.dump(response_data)
                return serialized_data, HTTPStatus.OK
            except Exception as e:
                raise InternalServerError(description=str(e))

        return wrapper
    
    return decorator