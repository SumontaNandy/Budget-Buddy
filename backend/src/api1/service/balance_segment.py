from werkzeug.exceptions import Conflict, NotFound
from http import HTTPStatus
from datetime import datetime
import uuid

from ..model.account import Account
from ..model.balance_segment import BalanceSegment


class BalanceSegmentUtil:
    """
        handles balance segment related operations
    """
    def create_a_balance_segment(self, name, amount, acc_id):
        ob = BalanceSegment(
            id = str(uuid.uuid4()),
            segment_name = name,
            amount = amount,
            account_id = Account.get_by_id(acc_id)
        )
        ob.add()

    def create_balance_segment(self, account_id, balance):
        self.create_a_balance_segment('available_balance', balance, account_id)
        self.create_a_balance_segment('saving_goals', 0, account_id)

    def add_balance(self, account_id, data):
        segments = BalanceSegment.query.filter_by(account=account_id).all()

        for segment in segments:
            if segment.segment_name in data.keys():
                amount = float(segment.amount) + float(data[segment.segment_name])
                segment.amount = amount
                segment.save()

    def withdraw_balance(self, account_id, data):
        segments = BalanceSegment.query.filter_by(account=account_id).all()

        for segment in segments:
            if segment.segment_name in data.keys():
                amount = float(segment.amount) - float(data[segment.segment_name])
                segment.amount = amount
                segment.save()

    def update_balance(self, account_id, data):
        segments = BalanceSegment.query.filter_by(account=account_id).all()

        for segment in segments:
            if segment.segment_name in data.keys():
                segment.amount = data[segment.segment_name]
                segment.save()
    
    def delete_balance_segment(self, account_id):
        segments = BalanceSegment.query.filter_by(account=account_id).all()

        for segment in segments:
            segment.delete()

    def get_balance_segment(self, account_id):
        segments = BalanceSegment.query.filter_by(account=account_id).all()
        segments = [ob.toDict() for ob in segments]

        data = {}
        for ob in segments:
            data[ob['segment_name']] = ob['amount']

        return data