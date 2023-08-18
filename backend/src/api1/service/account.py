from werkzeug.exceptions import BadRequest, NotFound
from http import HTTPStatus
import uuid
from datetime import datetime

from ..model.account import Account
from ..model.account_type import AccountType
from ..model.balance_segment import BalanceSegment
from ..model.user import User

from ..service.balance_segment import BalanceSegmentUtil


class AccountUtil:
    """
        Handles account related operations
    """
    def create_account(self, user_id, data):
        try:
            id = str(uuid.uuid4())
            new_account = Account(
                id = id,
                balance = data.get('balance'),
                user_id = User.get_by_id(user_id),
                account_type_id = AccountType.get_by_id(data.get('account_type_id'))
            )
            new_account.add()

            new_account = Account.get_by_id(id)
            for attr in new_account.toDict().keys():
                if attr in data:
                    setattr(new_account, attr, data[attr])
            new_account.save()

            BalanceSegmentUtil().create_balance_segment(id, data.get('balance'))

            return HTTPStatus.CREATED
        except Exception as e:
            raise BadRequest(str(e))
        
    def get_account(self, acc_id):
        acc = Account.get_by_id(acc_id).toDict()
        segment = BalanceSegment.query.filter_by(account=acc_id).all()

        segment = [ob.toDict() for ob in segment]

        acc['segment_list'] = segment
        acc['account_type_name'] = AccountType.get_name_by_id(acc['account_type'])

        return acc, HTTPStatus.OK

    def update_account(self, acc_id, data):
        account = Account.get_by_id(acc_id)

        if data['account_type_id'] is not None:
            data['account_type_id'] = AccountType.get_by_id(data.get('account_type_id'))
         
        for attr in account.toDict().keys():
            if attr in data:
                setattr(account, attr, data[attr])
            account.save()


        if data.get("balance") is not None:
            seg = BalanceSegmentUtil().get_balance_segment(acc_id)
            if data.get('action') == 'add':
                BalanceSegmentUtil().add_balance(acc_id, {"available_balance": data.get('balance')})
            else:
                if float(seg.get('saving_goals')) > float(data.get('balance')):
                    raise BadRequest(f"balance must be greater than total savings amount")
                else:
                    amount = float(data.get('balance')) - float(seg.get('saving_goals'))
                    BalanceSegmentUtil().update_balance(acc_id, {'available_balance': amount})

            seg = BalanceSegmentUtil().get_balance_segment(acc_id)
            amount = seg['available_balance'] + seg['saving_goals']
            account.balance = amount
            account.save()

        return self.get_account(acc_id)