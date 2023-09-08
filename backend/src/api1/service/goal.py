from werkzeug.exceptions import InternalServerError, BadRequest, NotFound
from http import HTTPStatus
import uuid

from ..model.goal import Goal
from ..model.user import User
from ..model.account import Account

from .account import AccountUtil
from .balance_segment import BalanceSegmentUtil


class GoalUtil:
    def __init__(self, id=None):
        self.id = str(uuid.uuid4())
        if id is not None:
            self.id = id

    def create_goal(self, user_id, data):
        try:
            new_goal = Goal(
                id = self.id,
                goal_amount = data.get('goal_amount'),
                user_id = User.get_by_id(user_id),
                account_id = Account.get_by_id(data.get('account_id'))
            )
            new_goal.add()

            print('ok')

            new_goal = Goal.get_by_id(self.id)

            if data.get('saved_so_far'):
                if AccountUtil(data.get('account_id')).get_available_balance() < data.get('saved_so_far'):
                    raise BadRequest('Saved so far cannot be greater than available balance')
                else:
                    new_goal.saved_so_far = data.get('saved_so_far')
                    BalanceSegmentUtil(data.get('account_id')).withdraw_available_balance(data.get('saved_so_far'))
                    BalanceSegmentUtil(data.get('account_id')).add_saving_goals(data.get('saved_so_far'))
                    
                    data.pop('saved_so_far')
                
            for attr in new_goal.toDict().keys():
                if attr in data:
                    setattr(new_goal, attr, data[attr])

            new_goal.save()

            return HTTPStatus.CREATED
        except Exception as e:
            raise InternalServerError(str(e))

    def get_goal(self):
        goal = Goal.get_by_id(self.id).toDict()

        return goal, HTTPStatus.OK
    
    def get_goal_list(self, user_id, filters):
        query = Goal.query.filter_by(user=user_id)

        if filters.get('account_id'):
            query = query.filter_by(account=filters.get('account_id'))

        total = query.count()

        page, per_page = 1, 2
        if filters.get('page'):
            page = int(filters.get('page'))
        if filters.get('per_page'):
            per_page = int(filters.get('per_page'))

        goal_list = query.paginate(page=page, per_page=per_page)

        data = {
            "goal_list": goal_list.items,
            "page_info": {
                "page": page,
                "per_page": per_page,
                "total": total,
                "has_next": goal_list.has_next,
                "has_prev": goal_list.has_prev,
                "page_list": [iter_page if iter_page else '...' for iter_page in goal_list.iter_pages()]
            }
        }

        return data, HTTPStatus.OK

    def update_goal(self, data):
        goal = Goal.get_by_id(self.id)

        if data.get('saved_so_far'):
            curr_available_balance = AccountUtil(goal.account_id).get_available_balance()
            curr_saved_so_far = goal.saved_so_far

            if curr_available_balance + curr_saved_so_far < data.get('saved_so_far'):
                raise BadRequest('Saved so far cannot be greater than available balance')
            
            BalanceSegmentUtil(goal.account_id).withdraw_saving_goals(curr_saved_so_far)
            BalanceSegmentUtil(goal.account_id).add_available_balance(curr_saved_so_far)

            BalanceSegmentUtil(goal.account_id).withdraw_available_balance(data.get('saved_so_far'))
            BalanceSegmentUtil(goal.account_id).add_saving_goals(data.get('saved_so_far'))

            data.pop('saved_so_far')

        for attr in goal.toDict().keys():
            if attr in data:
                setattr(goal, attr, data[attr])

        goal.save()

        return HTTPStatus.OK