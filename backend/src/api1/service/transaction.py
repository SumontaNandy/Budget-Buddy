from werkzeug.exceptions import InternalServerError
from http import HTTPStatus
import uuid

from ..model.transaction import Transaction, TransactionTag
from ..model.user import User
from ..model.account import Account
from ..model.sp_transaction import SpTransaction
from ..model.spending_plan import SpendingPlan

def create_a_transaction_tag_util(transaction_id, data):
    _tag = TransactionTag(
        id = str(uuid.uuid4()),
        tags = data,
        transaction_id = Transaction.get_by_id(transaction_id)
    )
    _tag.add()


def create_transaction_tags_util(transaction_id, data):
    for tag in data:
        create_a_transaction_tag_util(transaction_id, tag)


def delete_transaction_tags_util(transaction_id):
    tags = TransactionTag.query.filter_by(transaction=transaction_id).all()
    
    for tag in tags:
        tag.delete()


def create_a_sp_transaction_list_util(transaction_id, data):
    new_spt = SpTransaction(
        id = str(uuid.uuid4()),
        amount = data.get('amount'),
        transaction_id = Transaction.get_by_id(transaction_id),
        spending_plan_id = SpendingPlan.get_by_id(data.get('spending_plan_id'))
    )
    new_spt.add()


def create_sp_transaction_list_util(transaction_id, data):
    for spt in data:
        create_a_sp_transaction_list_util(transaction_id, spt)


def create_transaction_controller(user_id, data):
    try:
        id = str(uuid.uuid4())
        transaction = Transaction(
            id = id,
            type = data.get('type'),
            user_id = User.get_by_id(user_id),
            account_id = Account.get_by_id(data.get('account_id'))
        )
        transaction.add()

        if data.get('tp') is not None:
            create_sp_transaction_list_util(id, data.get('tp'))

        update_transaction_controller(id, data)

        return HTTPStatus.CREATED
    except Exception as e:
        raise InternalServerError(str(e))
    

def get_transaction_controller(transaction_id):
    transaction = Transaction.get_by_id(transaction_id).toDict()

    tags = TransactionTag.query.filter_by(transaction=transaction_id).all()
    tags = [x.toDict().get('tags') for x in tags]

    transaction['tags'] = tags

    return transaction, HTTPStatus.OK


def update_transaction_controller(transaction_id, data):
    transaction = Transaction.get_by_id(transaction_id)

    if data.get('tags') is not None:
        delete_transaction_tags_util(transaction_id)
        create_transaction_tags_util(transaction_id, data.get('tags'))
        data.pop('tags')

    for key in data.keys():
        if key in transaction.toDict():
            setattr(transaction, key, data[key])
    transaction.save()

    return HTTPStatus.OK