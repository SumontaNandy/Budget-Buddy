from werkzeug.exceptions import Conflict, BadRequest
from http import HTTPStatus
import uuid

from ... import db
from .models import *
from ..auth.models import User


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
    

def create_recurrent_expense_controller(user_id, data):
    try:
        id = str(uuid.uuid4())
        create_spending_plan_util(id, user_id, data)

        recurrent_expense = RecurrentExpense(
            id = id,
            next_date = data.get('next_date'),
            frequency = data.get('frequency'),
            type = data.get('type')
        )
        recurrent_expense.add()

        recurrent_expense = RecurrentExpense.get_by_id(id)
        for key in data.keys():
            setattr(recurrent_expense, key, data[key])
        recurrent_expense.save()

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


def get_recurrent_expense_controller(id):
    data = db.session.query(SpendingPlan.id, SpendingPlan.name, SpendingPlan.category, SpendingPlan.amount, RecurrentExpense.next_date, 
                            RecurrentExpense.end_date, RecurrentExpense.frequency, RecurrentExpense.type).\
                            join(RecurrentExpense).filter(SpendingPlan.id==id).first()

    
    return data, HTTPStatus.OK


def update_recurrent_expense_controller(id, data):
    ob1 = SpendingPlan.get_by_id(id)
    ob2 = RecurrentExpense.get_by_id(id)

    for key in data.keys():
        if key in ob1.toDict():
            setattr(ob1, key, data[key])
        if key in ob2.toDict():
            setattr(ob2, key, data['key'])

    ob1.save()
    ob2.save()

    return HTTPStatus.OK  