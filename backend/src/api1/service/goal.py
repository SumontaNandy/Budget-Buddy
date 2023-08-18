from werkzeug.exceptions import InternalServerError
from http import HTTPStatus
import uuid

from ..model.goal import Goal
from ..model.user import User
from ..model.account import Account


def create_goal_controller(user_id, data):
    try:
        id = str(uuid.uuid4())
        new_goal = Goal(
            id = id,
            goal_amount = data.get('goal_amount'),
            user_id = User.get_by_id(user_id),
            account_id = Account.get_by_id(data.get('account_id'))
        )
        new_goal.add()

        for e in ['goal_amount', 'account_id']:
             data.pop(e)

        update_goal_controller(id, data)

        return HTTPStatus.CREATED
    except Exception as e:
        raise InternalServerError(str(e))
    

def get_goal_controller(goal_id):
    goal = Goal.get_by_id(goal_id).toDict()

    return goal, HTTPStatus.OK


def update_goal_controller(goal_id, data):
    goal = Goal.get_by_id(goal_id)

    for key in data.keys():
        if key in goal.toDict():
            setattr(goal, key, data[key])
    goal.save()
    
    return HTTPStatus.OK