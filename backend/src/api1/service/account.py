from werkzeug.exceptions import BadRequest, NotFound
from http import HTTPStatus
import uuid
from datetime import datetime

from ..model.account import Account
from ..model.account_type import AccountType
from ..model.balance_segment import BalanceSegment
from ..model.user import User

from ..service.balance_segment import BalanceSegmentUtil
from ..service.deposite import DepositeUtil


class AccountUtil:
    """
        Handles account related operations
    """
    def __init__(self, id=None):
        self.id = id

    def validate_amount(self, amount):
        if amount < 0:
            raise BadRequest("Amount should be greater than zero")

    def create_account(self, user_id, data):
        try:
            self.validate_amount(data.get('balance'))
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

            BalanceSegmentUtil(id).create_balance_segments(data.get('balance'))

            return HTTPStatus.CREATED
        except Exception as e:
            raise BadRequest(str(e))
        
    def get_account(self):
        self.update_total_balance()
        acc = Account.get_by_id(self.id).toDict()
        segment = BalanceSegment.query.filter_by(account=self.id).all()

        segment = [ob.toDict() for ob in segment]

        acc['segment_list'] = segment
        acc['account_type_name'] = AccountType.get_name_by_id(acc['account_type'])

        return acc, HTTPStatus.OK

    def update_account(self, data):
        account = Account.get_by_id(self.id)

        if data['account_type_id'] is not None:
            data['account_type_id'] = AccountType.get_by_id(data.get('account_type_id'))
         
        for attr in account.toDict().keys():
            if attr in data:
                setattr(account, attr, data[attr])
            account.save()

        if data.get("balance") is not None:
            self.update_balance_segment(self.id, data)

        return self.get_account(self.id)
    
    def update_balance_segment(self, data):
        BalanceSegmentUtil(self.id).update_balance_segment(data)
        self.update_total_balance(self.id)
    
    def update_total_balance(self):
        account = Account.get_by_id(self.id)

        seg = BalanceSegmentUtil(self.id).get_balance_segment()
        amount = seg['available_balance'] + seg['saving_goals']
        account.balance = amount
        account.save()

    def get_available_balance(self):
        seg = BalanceSegmentUtil(self.id).get_balance_segment()

        return seg['available_balance']
    
    def deposite(self, data):
        DepositeUtil(self.id).add_deposite(data)
        return HTTPStatus.OK

    def get_deposite_history(self, filters=None):
        return DepositeUtil(self.id).get_deposite_history(filters), HTTPStatus.OK