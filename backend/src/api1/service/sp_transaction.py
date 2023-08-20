from werkzeug.exceptions import InternalServerError
from http import HTTPStatus
import uuid

from ..model.transaction import Transaction, TransactionTag
from ..model.user import User
from ..model.account import Account
from ..model.sp_transaction import SpTransaction
from ..model.spending_plan import SpendingPlan

from ..service.balance_segment import BalanceSegmentUtil


class SPTransactionUtil:
    def create_a_sp_transaction(self, transaction_id, data):
        transaction = Transaction.get_by_id(transaction_id)

        new_spt = SpTransaction(
            id = str(uuid.uuid4()),
            amount = data.get('amount'),
            transaction_id = transaction,
            spending_plan_id = SpendingPlan.get_by_id(data.get('spending_plan_id'))
        )
        new_spt.add()

        transaction = transaction.toDict()
        BalanceSegmentUtil().withdraw_balance(transaction['account'], {"avilable_balance": data['amount']})
        

    def create_sp_transaction(self, transaction_id, data):
        for spt in data:
           self.create_a_sp_transaction(transaction_id, spt) 