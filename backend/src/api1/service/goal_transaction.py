from werkzeug.exceptions import InternalServerError
from http import HTTPStatus
import uuid

from ..model.transaction import Transaction, TransactionTag
from ..model.user import User
from ..model.account import Account
from ..model.goal_transaction import GoalTransaction
from ..model.goal import Goal

from ..service.balance_segment import BalanceSegmentUtil


class GoalTransactionUtil:
    def create_a_goal_transaction(self, transaction_id, data):
        transaction = Transaction.get_by_id(transaction_id)

        new_gt = GoalTransaction(
            id = str(uuid.uuid4()),
            amount = data.get('amount'),
            transaction_id = transaction,
            goal_id = Goal.get_by_id(data.get('goal_id'))
        )
        new_gt.add()

        transaction = transaction.toDict()
        BalanceSegmentUtil().withdraw_balance(transaction['account'], {"avilable_balance": data['amount']})
        

    def create_goal_transaction(self, transaction_id, data):
        for spt in data:
           self.create_a_goal_transaction(transaction_id, spt) 