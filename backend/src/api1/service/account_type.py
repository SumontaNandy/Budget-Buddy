from http import HTTPStatus

from ..model.account_type import AccountType
from ..model.account import Account


def get_account_types_controller(filters):
    root = AccountType.query.filter_by(parent_id=None).first().id

    if filters.get('id') is not None:
        root = filters.get('id')

    child = get_children_util(root)

    return child, HTTPStatus.OK


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