from werkzeug.exceptions import BadRequest, InternalServerError
from http import HTTPStatus
from datetime import datetime
import uuid

from ..model.account import Account
from ..model.balance_segment import BalanceSegment


class BalanceSegmentUtil:
    """
        handles balance segment related operations
    """
    def __init__(self, account_id=None):
        self.account_id = account_id

    def validate_amount(self, amount):
        if float(amount) < 0:
            raise BadRequest("Amount should be greater than zero")
        
    def update_validation(self, amount):
        ob = BalanceSegment.query.filter_by(account=self.account_id, segment_name='saving_goals').first()
        if float(amount) < float(ob.amount):
            raise BadRequest("Amount should be greater than saving goals")

    def create_a_balance_segment(self, name, amount):
        self.validate_amount(amount)
        try:
            ob = BalanceSegment(
                id = str(uuid.uuid4()),
                segment_name = name,
                amount = amount,
                last_edit_time = datetime.now(),
                account_id = Account.get_by_id(self.account_id)
            )
            ob.add()
        except Exception as e:
            raise InternalServerError(str(e))

    def get_avialable_balance(self):
        ob = BalanceSegment.query.filter_by(account=self.account_id, segment_name='available_balance').first()
        return ob.amount
    
    def get_saving_goals(self):
        ob = BalanceSegment.query.filter_by(account=self.account_id, segment_name='saving_goals').first()
        return ob.amount
        
    def create_balance_segments(self, balance):
        self.create_a_balance_segment('available_balance', balance)
        self.create_a_balance_segment('saving_goals', 0)

    def add_available_balance(self, amount):
        self.validate_amount(amount)
        ob = BalanceSegment.query.filter_by(account=self.account_id, segment_name='available_balance').first()
        ob.amount = ob.amount + amount
        ob.last_edit_time = datetime.now()
        ob.save()

    def withdraw_available_balance(self, amount):
        self.validate_amount(amount)
        ob = BalanceSegment.query.filter_by(account=self.account_id, segment_name='available_balance').first()
        if ob.amount < amount:
            raise BadRequest("Insufficient Balance")
        ob.amount = ob.amount - amount
        ob.last_edit_time = datetime.now()
        ob.save()

    def update_available_balance(self, amount):
        self.validate_amount(amount)
        ob = BalanceSegment.query.filter_by(account=self.account_id, segment_name='available_balance').first()
        ob.amount = amount
        ob.last_edit_time = datetime.now()
        ob.save()

    def add_saving_goals(self, amount):
        self.validate_amount(amount)
        ob = BalanceSegment.query.filter_by(account=self.account_id, segment_name='saving_goals').first()
        ob.amount = ob.amount + amount
        ob.last_edit_time = datetime.now()
        ob.save()

    def withdraw_saving_goals(self, amount):
        self.validate_amount(amount)
        ob = BalanceSegment.query.filter_by(account=self.account_id, segment_name='saving_goals').first()
        if ob.amount < amount:
            raise BadRequest("Insufficient Balance")
        ob.amount = ob.amount - amount
        ob.last_edit_time = datetime.now()
        ob.save()

    def update_saving_goals(self, amount):
        self.validate_amount(amount)
        ob = BalanceSegment.query.filter_by(account=self.account_id, segment_name='saving_goals').first()
        ob.amount = amount
        ob.last_edit_time = datetime.now()
        ob.save()

    def update_balance_segments(self, balance):
        self.update_validation(balance)
        ob = BalanceSegment.query.filter_by(account=self.account_id, segment_name='saving_goals').first()
        balance = float(balance) - float(ob.amount)
        self.update_available_balance(balance)
    
    def delete_balance_segment(self):
        segments = BalanceSegment.query.filter_by(account=self.account_id).all()
        for segment in segments:
            segment.delete()

    def get_balance_segment(self):
        segments = BalanceSegment.query.filter_by(account=self.account_id).all()
        segments = [ob.toDict() for ob in segments]

        data = {}
        for ob in segments:
            data[ob['segment_name']] = ob['amount']

        return data