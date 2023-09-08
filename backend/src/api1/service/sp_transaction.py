from werkzeug.exceptions import InternalServerError, BadRequest
from http import HTTPStatus
import uuid

from ..model.transaction import Transaction, TransactionTag
from ..model.user import User
from ..model.account import Account
from ..model.sp_transaction import SpTransaction
from ..model.spending_plan import SpendingPlan

from ..service.balance_segment import BalanceSegmentUtil


class SPTransactionUtil:
    def __init__(self, id=None):
        self.id = id

    def validate_amount(self, amount):        
        if amount < 0:
            raise BadRequest("Amount cannot be negative")

    def create_a_sp_transaction(self, transaction_id, data):
        transaction = Transaction.get_by_id(transaction_id)
        account_id = transaction.toDict().get('account')

        self.validate_amount(data.get('amount'))

        if BalanceSegmentUtil(account_id).get_avialable_balance() < data.get('amount'):
            raise BadRequest("Insufficient balance")

        new_spt = SpTransaction(
            id = str(uuid.uuid4()),
            amount = data.get('amount'),
            transaction_id = transaction,
            spending_plan_id = SpendingPlan.get_by_id(data.get('spending_plan_id'))
        )
        new_spt.add()
        BalanceSegmentUtil(account_id).withdraw_available_balance(data.get('amount'))        

    def create_sp_transaction(self, transaction_id, data):
        for spt in data:
           self.create_a_sp_transaction(transaction_id, spt) 

    def update_a_sp_transaction(self, transaction_id, data):
        if data.get('spending_plan_id'):
            ob = SpTransaction.get_by_id(self.id)
            ob.spending_plan_id = SpendingPlan.get_by_id(data.get('spending_plan_id'))
            ob.save()

        if data.get('amount'):
            self.validate_amount(data.get('amount'))
            ob = SpTransaction.get_by_id(self.id)
            account_id = Transaction.get_by_id(transaction_id).toDict().get('account')

            available_balance = BalanceSegmentUtil(account_id).get_avialable_balance() + ob.amount
            if available_balance < data.get('amount'):
                raise BadRequest("Insufficient balance")
            else:
                BalanceSegmentUtil(account_id).add_available_balance(ob.amount)
                BalanceSegmentUtil(account_id).withdraw_available_balance(data.get('amount'))
            
            ob.amount = data.get('amount')
            ob.save()

    def update_sp_transaction(self, transaction_id, data):
        for spt in data:
            self.update_a_sp_transaction(transaction_id, spt)

    def get_sp_transaction(self, transaction_id):
        sp_transaction = SpTransaction.query.filter_by(transaction=transaction_id).all()

        sp_transaction = [x.toDict() for x in sp_transaction]

        return sp_transaction