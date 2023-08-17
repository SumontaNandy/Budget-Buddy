from werkzeug.exceptions import Conflict
from http import HTTPStatus
import uuid

from ..model.spending_plan import SpendingPlan
from ..model.user import User
from ..model.onetime_expense import OneTimeExpense


def create_spending_plan_util(id, user_id, data):
    spending_plan = SpendingPlan(
        id = id,
        name = data.get('name'),
        amount = data.get('amount'),
        user_id = User.get_by_id(user_id)
    )
    spending_plan.add()


def create_one_time_expense_controller(user_id, data):
    try:
        id = str(uuid.uuid4())        
        create_spending_plan_util(id, user_id, data)

        one_time_expense = OneTimeExpense(
            id = id
        )
        one_time_expense.add()

        return HTTPStatus.CREATED
    except Exception as e:
        raise Conflict(f"Amount must be non-negative")
    

def get_one_time_expense_controller(id):
    expense = SpendingPlan.get_by_id(id).toDict()

    # implement later
    expense['amount_left'] = 0

    return expense, HTTPStatus.OK


def update_one_time_expense_controller(id, data):
    expense = SpendingPlan.get_by_id(id)

    for key in data.keys():
        setattr(expense, key, data[key])
    expense.save()

    return HTTPStatus.OK