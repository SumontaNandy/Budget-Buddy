from flask import request, jsonify
from flask_restx import fields
from werkzeug.exceptions import Conflict, BadRequest
from werkzeug.security import generate_password_hash, check_password_hash
from http import HTTPStatus
from flask_jwt_extended import create_access_token, create_refresh_token,jwt_required, get_jwt_identity

from ... import db
from .models import *

def transaction_authorization_controller(user_id, transaction_id):
    return True