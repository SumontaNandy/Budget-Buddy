from werkzeug.exceptions import BadRequest
from datetime import datetime
from sqlalchemy import desc
import uuid

from ..model.account import Account
from ..model.deposite_history import DepositeHistory as Deposite

from .balance_segment import BalanceSegmentUtil

class DepositeUtil:
    def __init__(self, account_id=None):
        self.account_id = account_id

    def validate_amount(self, amount):
        if float(amount) < 0:
            raise BadRequest("Amount should be greater than zero")
        
    def add_deposite(self, data):
        amount = data.get('amount')
        self.validate_amount(amount)
        BalanceSegmentUtil(self.account_id).add_available_balance(amount)
        ob = Deposite(
            id = str(uuid.uuid4()),
            amount = amount,
            date = data.get('date'),
            account_id = Account.get_by_id(self.account_id)
        )
        ob.add()

    def get_deposite_history(self, filter=None):
        query = Deposite.query.filter_by(account=self.account_id)

        if filter:
            if 'page' in filter:
                page = int(filter['page'])
            if 'per_page' in filter:
                per_page = int(filter['per_page'])
            if 'start_date' in filter:
                print(filter['start_date'])
                query = query.filter(Deposite.date >= filter['start_date'])
            if 'end_date' in filter:
                query = query.filter(Deposite.date <= filter['end_date'])

        query = query.order_by(desc(Deposite.date))

        total = query.count()
        page, per_page = 1, 2
        deposite = query.paginate(page=page, per_page=per_page)

        data = {
            "deposites": deposite.items,
            "page_info": {
                "page": page,
                "per_page": per_page,
                "total": total,
                "has_next": deposite.has_next,
                "has_prev": deposite.has_prev,
                "page_list": [iter_page if iter_page else '...' for iter_page in deposite.iter_pages()]
            }
        }   

        return data
        
        