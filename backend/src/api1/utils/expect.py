from flask import request
from functools import wraps
from marshmallow import ValidationError
from werkzeug.exceptions import BadRequest


def expect(schema):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            json_data = request.get_json()
            try:
                schema.load(json_data)
            except ValidationError as e:
                raise BadRequest(description=str(e))

            return func(*args, **kwargs)
        
        return wrapper
    return decorator