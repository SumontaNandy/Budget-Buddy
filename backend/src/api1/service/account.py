from werkzeug.exceptions import Conflict, NotFound
from http import HTTPStatus
import uuid
from datetime import datetime

from ..model.account import Account
from ..model.account_type import AccountType
from ..model.balance_segment import BalanceSegment
from ..model.user import User

def create_balance_segment_object(name, amount, acc_id):
    return BalanceSegment(
         id = str(uuid.uuid4()),
         segment_name = name,
         amount = amount,
         last_edit_time = datetime.now(),
         account_id = Account.get_by_id(acc_id)
    )


def create_balance_segment_controller(account_id, curr_balance):
    new_balance_segment = create_balance_segment_object('available_balance', curr_balance, account_id)
    new_balance_segment.add()

    new_balance_segment = create_balance_segment_object('saving_goals', 0, account_id)
    new_balance_segment.add()


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
            account_type_id = AccountType.get_by_id(data.get('account_type_id'))
        )
        new_account.add()

        create_balance_segment_controller(id, data.get('balance'))

        return HTTPStatus.CREATED
    except Exception as e:
        raise Conflict(f"Balance must be non-negative")


def get_account_controller(account_id):
    accout_details = Account.get_by_id(account_id).toDict()
    segment_details = BalanceSegment.query.filter_by(account=account_id).all()

    segment_details = [ob.toDict() for ob in segment_details]
    accout_details['segment_list'] = segment_details
    accout_details['account_type_name'] = AccountType.get_name_by_id(accout_details['account_type'])
    
    return accout_details, HTTPStatus.OK


def update_account_controller(account_id, data):
    account = Account.get_by_id(account_id)

    if data['account_type_id'] is not None:
        data['account_type_id'] = AccountType.get_by_id(data.get('account_type_id'))
         
    for key in data.keys():
        setattr(account, key, data[key])

    account.save()

    '''
        need to update segments also
    '''

    return get_account_controller(account_id)


def delete_account_controller(account_id):
    try:
        account = Account.get_by_id(account_id)
        segments = BalanceSegment.query.filter_by(account=account_id).all()

        for segment in segments:
            segment.delete()

        account.delete()

        return HTTPStatus.OK
    except Exception as e:
        raise NotFound("Cannot delete the account")