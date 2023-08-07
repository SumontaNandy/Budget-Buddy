from flask import request, jsonify, redirect
from flask_restx import fields
from werkzeug.exceptions import Conflict, BadRequest
from werkzeug.security import generate_password_hash, check_password_hash
from http import HTTPStatus
from flask_jwt_extended import create_access_token, create_refresh_token,jwt_required, get_jwt_identity
import uuid

from ... import db
from .models import *
from ..auth.models import User
from ..account.models import Account, BalanceSegment


def get_account_types_controller():
    root = AccountType.query.filter_by(parent_id=None).first()

    types1 = AccountType.query.filter_by(parent_id=root.id).all()
    types1 = [x.toDict() for x in types1]
    for i in range(len(types1)):
        types1[i].pop('parent_id')

    return types1, HTTPStatus.OK


def get_ancestors_util(account_type_id):
    ob = AccountType.get_by_id(account_type_id)

    if ob.get_parent_id() is None:
        return [ob.toDict()]
    
    parent = get_ancestors_util(ob.get_parent_id())
    parent.append(ob.toDict())

    return parent


def get_children_util(account_type_id):
    child = AccountType.query.filter_by(parent_id=account_type_id).all()

    child = [x.toDict() for x in child]

    return child


def get_account_of_a_user_by_type_util(user_id, account_type_id):
    accounts = Account.query.filter_by(user=user_id, account_type=account_type_id).all()

    accounts = [x.toDict() for x in accounts]

    return accounts


def get_accounts_of_a_type_controller(user_id, account_type_id):
    dict = {
        'parent': get_ancestors_util(account_type_id),
        'child': get_children_util(account_type_id),
        'accounts': get_account_of_a_user_by_type_util(user_id, account_type_id)
    }

    return dict, HTTPStatus.OK