from werkzeug.exceptions import Conflict, InternalServerError
from http import HTTPStatus
import uuid
from datetime import datetime

from sqlalchemy.sql.expression import func


from __init__ import db

from ..model.spending_plan import SpendingPlan
from ..model.user import User
from ..model.recurrent_expense import RecurrentExpense


class RecurrentExpenseUtil:
    def __init__(self, id=None):
        self.id = str(uuid.uuid4()) if id is None else id 

    def validate_amount(self, amount):
        if float(amount) < 0:
            raise Conflict(f"Amount must be non-negative")
    
    def create_spending_plan(self, user_id, data):
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
        if data.get('category'):
            spending_plan.category = data.get('category')
        spending_plan.save()

    def create_recurrent_expense(self, user_id, data):
        try:
            self.create_spending_plan(user_id, data)
            recurrent_expense = RecurrentExpense(
                id = self.id,
                next_date = data.get('next_date'),
                frequency = data.get('frequency'),
                type = data.get('type')
            )
            recurrent_expense.add()

            recurrent_expense = RecurrentExpense.get_by_id(self.id)
            for key in data.keys():
                if key in recurrent_expense.toDict().keys():
                    setattr(recurrent_expense, key, data[key])
            recurrent_expense.save()

            return HTTPStatus.CREATED
        except Exception as e:
            raise InternalServerError(str(e))
        
    def get_dict(self, ob):
        dict = {
            "id": ob[0],
            "name": ob[1],
            "amount": ob[2],
            "category": ob[3],
            "next_date": ob[4],
            "end_date": ob[5],
            "frequency": ob[6],
            "type": ob[7],
        }

        return dict
        
    def get_recurrent_expense(self, filters=None):
        data = db.session.query(SpendingPlan.id, SpendingPlan.name, SpendingPlan.amount, SpendingPlan.category, RecurrentExpense.next_date, 
                                RecurrentExpense.end_date, RecurrentExpense.frequency, RecurrentExpense.type).\
                                join(RecurrentExpense).filter(SpendingPlan.id==self.id).first()
        
        from ..model.sp_transaction import SpTransaction
        x = SpTransaction.query\
            .with_entities(func.sum(SpTransaction.amount))\
            .filter(SpTransaction.spending_plan == data[0])\
            .first()[0]
        if x is None:
            x = "0"
        data = self.get_dict(data)
        data['amount_used'] = float(x)


        if filters.get('transaction_start') and filters.get('transaction_end'):    
            from ..model.transaction import Transaction
            from ..model.sp_transaction import SpTransaction
            x = db.session.query(func.sum(SpTransaction.amount)).\
                join(Transaction).\
                filter(SpTransaction.spending_plan == self.id).\
                filter(Transaction.date >= filters.get('transaction_start')).\
                filter(Transaction.date <= filters.get('transaction_end')).\
                first()[0]
        
            if x is None:
                x = "0"

            data['amount_used_within_range'] = float(x)

        return data, HTTPStatus.OK
    
    def get_recurrent_expense_list(self, user_id, filters=None):
        query = db.session.query(SpendingPlan.id, SpendingPlan.name, SpendingPlan.amount, SpendingPlan.category, RecurrentExpense.next_date, 
                                RecurrentExpense.end_date, RecurrentExpense.frequency, RecurrentExpense.type).\
                                join(RecurrentExpense).filter(SpendingPlan.user==user_id)
        
        if filters.get('category'):
            query = query.filter(SpendingPlan.category == filters.get('category'))
        if filters.get('type'):
            query = query.filter(RecurrentExpense.type == filters.get('type'))
        if filters.get('next_date'):
            query = query.filter(RecurrentExpense.next_date == filters.get('next_date'))
        if filters.get('end_date'):
            query = query.filter(RecurrentExpense.end_date == filters.get('end_date'))
        if filters.get('frequency'):
            query = query.filter(RecurrentExpense.frequency == filters.get('frequency'))
        if filters.get('upcoming'):
            query = query.filter(RecurrentExpense.next_date >= datetime.now())
        if filters.get('start'):
            query = query.filter(SpendingPlan.creation_time >= filters.get('start'))
        if filters.get('end'):
            query = query.filter(SpendingPlan.creation_time <= filters.get('end'))

        page, per_page = 1, 2
        if filters.get('page'):
            page = int(filters.get('page'))
        if filters.get('per_page'):
            per_page = int(filters.get('per_page'))

        total = query.count()

        data = query.paginate(page, per_page)

        items = data.items
        for i in range(len(items)):
            from ..model.sp_transaction import SpTransaction
            x = SpTransaction.query\
                .with_entities(func.avg(SpTransaction.amount))\
                .filter(SpTransaction.spending_plan == items[i][0])\
                .first()[0]
            if x is None:
                x = "0"
            items[i] = self.get_dict(items[i])
            items[i]['amount_used'] = float(x)


        if filters.get('transaction_start') and filters.get('transaction_end'):    
            for i in range(len(items)):
                from ..model.transaction import Transaction
                from ..model.sp_transaction import SpTransaction
                x = db.session.query(func.sum(SpTransaction.amount)).\
                    join(Transaction).\
                    filter(SpTransaction.spending_plan == items[i].get('id')).\
                    filter(Transaction.date >= filters.get('transaction_start')).\
                    filter(Transaction.date <= filters.get('transaction_end')).\
                    first()[0]
            
                if x is None:
                    x = "0"

                items[i]['amount_used_within_range'] = float(x)

        recurrent_expense_list = {
            "recurrent_expenses": items,
            "page_info": {
                "page": page,
                "per_page": per_page,
                "total": total,
                "has_next": data.has_next,
                "has_prev": data.has_prev,
                "page_list": [iter_page if iter_page else '...' for iter_page in data.iter_pages()]
            }
        }

        return recurrent_expense_list, HTTPStatus.OK

    
    def update_recurrent_expense(self, data):
        if data.get('amount'):
            self.validate_amount(data.get('amount'))

        ob1 = SpendingPlan.get_by_id(self.id)
        ob2 = RecurrentExpense.get_by_id(self.id)

        for key in data.keys():
            if key in ob1.toDict():
                setattr(ob1, key, data[key])
            if key in ob2.toDict():
                setattr(ob2, key, data[key])

        ob1.save()
        ob2.save()

        return HTTPStatus.OK