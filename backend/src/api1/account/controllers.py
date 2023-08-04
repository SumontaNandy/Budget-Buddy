from flask import request, jsonify
from flask_restx import fields
from werkzeug.exceptions import Conflict, BadRequest
from werkzeug.security import generate_password_hash, check_password_hash
from http import HTTPStatus
from flask_jwt_extended import create_access_token, create_refresh_token,jwt_required, get_jwt_identity

from ... import db
from .models import *

def account_authorization_controller(user_id, account_no):
    return True

def create_account_controller(user_id, data):
    try:
        new_account = Account(
            account_no = data.get('account_no'),
            account_name = data.get('account_name'),
            balace = data.get('balance'),
            date = data.get('date'),
            user_id = user_id,
            account_type = data.get('account_type')
        )
        new_account.add()

        return HTTPStatus.CREATED
    except Exception as e:
        raise Conflict(f"Account with account_no {data.get('account_no')} exists")