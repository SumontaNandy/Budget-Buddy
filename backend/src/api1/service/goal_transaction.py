from werkzeug.exceptions import InternalServerError, BadRequest
from http import HTTPStatus
import uuid

from ..model.transaction import Transaction, TransactionTag
from ..model.user import User
from ..model.account import Account
from ..model.goal_transaction import GoalTransaction
from ..model.goal import Goal

from ..service.balance_segment import BalanceSegmentUtil


class GoalTransactionUtil:
    def __init__(self, id=None):
        self.id = id

    def validate_amount(self, goal_id, account_id, amount):
        if amount < 0:
            raise BadRequest("Amount cannot be negative")
        available_balance = Goal.get_by_id(goal_id).toDict().get('saved_so_far')
        if available_balance < amount:
            raise BadRequest("Insufficient balance")

        available_balance = BalanceSegmentUtil(account_id).get_saving_goals()
        if available_balance < amount:
            raise BadRequest("Insufficient balance")

    def create_a_goal_transaction(self, transaction_id, data):
        account_id = Transaction.get_by_id(transaction_id).toDict().get('account')
        self.validate_amount(data.get('goal_id'), account_id, data.get('amount'))

        if data.get('withdraw_for') == 'own':
            BalanceSegmentUtil(account_id).withdraw_saving_goals(data.get('amount'))
            new_gt = GoalTransaction(
                id = str(uuid.uuid4()),
                amount = data.get('amount'),
                transaction_id = Transaction.get_by_id(transaction_id),
                goal_id = Goal.get_by_id(data.get('goal_id'))
            )
            new_gt.add()

            goal = Goal.get_by_id(data.get('goal_id'))
            goal.spent_so_far = float(goal.spent_so_far) + float(data.get('amount'))
            goal.save()
        
        else:
            BalanceSegmentUtil(account_id).add_available_balance(data.get('amount'))
            BalanceSegmentUtil(account_id).withdraw_saving_goals(data.get('amount'))  
            
            goal = Goal.get_by_id(data.get('goal_id'))
            goal.saved_so_far = float(goal.saved_so_far) - float(data.get('amount'))
            goal.save()

    def create_goal_transaction(self, transaction_id, data):
        for spt in data:
           self.create_a_goal_transaction(transaction_id, spt) 

    def get_goal_transaction(self, transaction_id):
        goal_transaction = GoalTransaction.query.filter_by(transaction=transaction_id).all()

        goal_transaction = [ob.toDict() for ob in goal_transaction]

        return goal_transaction