from flask import request, jsonify
from flask_restx import fields
from werkzeug.exceptions import Conflict, BadRequest
from werkzeug.security import generate_password_hash, check_password_hash
from http import HTTPStatus
from flask_jwt_extended import create_access_token, create_refresh_token,jwt_required, get_jwt_identity
import uuid

from ... import db
from .models import *
from ..auth.models import User

def create_account_controller(user_id, data):
    try:
        id = str(uuid.uuid4())
        new_account = Account(
            id = id,
            account_no = data.get('account_no'),
            account_name = data.get('account_name'),
            balance = data.get('balance'),
            date = data.get('date'),
            user_id = User.get_by_id(user_id),
            account_type_id = AccountType.get_by_id(data.get('account_type'))
        )
        new_account.add()

        return HTTPStatus.CREATED
    except Exception as e:
        raise Conflict(f"balance must be greater than zero")