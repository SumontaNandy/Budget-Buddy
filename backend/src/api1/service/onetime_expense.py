from werkzeug.exceptions import Conflict, InternalServerError
from http import HTTPStatus
import uuid

from sqlalchemy.sql.expression import func

from datetime import datetime

from ..model.spending_plan import SpendingPlan
from ..model.user import User
from ..model.onetime_expense import OneTimeExpense

class OneTimeExpenseUtil:
    def __init__(self, id=None):
        self.id = str(uuid.uuid4())
        if id is not None:
            self.id = id

    def validate_amount(self, amount):
        if amount < 0:
            raise Conflict("Amount should be greater than zero")

    def create_spending_plan(self, user_id, data):
        try:
            self.validate_amount(data.get('amount'))
            spending_plan = SpendingPlan(
                id = self.id,
                name = data.get('name'),
                amount = data.get('amount'),
                user_id = User.get_by_id(user_id),
                creation_time = datetime.now()
            )
            spending_plan.add()

            spending_plan = SpendingPlan.get_by_id(self.id)

            if data.get('category') is not None:
                spending_plan.category = data.get('category')

            spending_plan.save()

            return HTTPStatus.CREATED
        except Exception as e:
            raise InternalServerError(str(e))

    def create_one_time_expense(self, user_id, data):
        try:
            self.validate_amount(data.get('amount'))
            self.create_spending_plan(user_id, data)

            one_time_expense = OneTimeExpense(
                id = self.id
            )
            one_time_expense.add()

            return HTTPStatus.CREATED
        except Exception as e:
            raise InternalServerError(str(e))
        
    def get_one_time_expense(self):
        try:
            one_time_expense = SpendingPlan.get_by_id(self.id).toDict()

            from ..model.sp_transaction import SpTransaction
            x = SpTransaction.query\
                .with_entities(func.avg(SpTransaction.amount))\
                .filter(SpTransaction.spending_plan == one_time_expense.get('id'))\
                .first()[0]
            if x is None:
                x = "0"

            one_time_expense['amount_used'] = x

            return one_time_expense, HTTPStatus.OK
        except Exception as e:
            raise InternalServerError(str(e))
        
    def get_one_time_expense_list(self, user_id, filters=None):
        try:
            query = SpendingPlan.query.filter_by(user=user_id)

            if filters.get('category'):
                query = query.filter(SpendingPlan.category == filters.get('category'))
            
            if filters.get('creation_time'):
                query = query.filter(SpendingPlan.creation_time == filters.get('creation_time'))

            page, per_page = 1, 2
            if filters.get('page'):
                page = int(filters.get('page'))
            if filters.get('per_page'):
                per_page = int(filters.get('per_page'))

            total = query.count()
            data = query.paginate(page=page, per_page=per_page)

            items = [item.toDict() for item in data.items]
            for i in range(len(items)):
                from ..model.sp_transaction import SpTransaction
                x = SpTransaction.query\
                    .with_entities(func.avg(SpTransaction.amount))\
                    .filter(SpTransaction.spending_plan == items[i].get('id'))\
                    .first()[0]
                if x is None:
                    x = "0"
                items[i]['amount_used'] = float(x)
                
            print(items)
                
            one_time_expense_list = {
                "one_time_expenses": items,
                "page_info": {
                    "page": page,
                    "per_page": per_page,
                    "total": total,
                    "has_next": data.has_next,
                    "has_prev": data.has_prev,
                    "page_list": [iter_page if iter_page else '...' for iter_page in data.iter_pages()]
                }
            }

            return one_time_expense_list, HTTPStatus.OK
        except Exception as e:
            raise InternalServerError(str(e))
        
    def update_one_time_expense(self, data):
        try:
            if data.get('amount'):
                self.validate_amount(data.get('amount'))
            spending_plan = SpendingPlan.get_by_id(self.id)

            for key in data.keys():
                if key in spending_plan.toDict().keys():
                    setattr(spending_plan, key, data[key])
            spending_plan.save()

            return HTTPStatus.OK
        except Exception as e:
            raise InternalServerError(str(e))