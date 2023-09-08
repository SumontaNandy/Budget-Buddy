from werkzeug.exceptions import BadRequest
from datetime import datetime
from sqlalchemy import desc
import uuid
from http import HTTPStatus

from ..model.account import Account
from ..model.deposite_history import DepositeHistory

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
        ob = DepositeHistory(
            id = str(uuid.uuid4()),
            amount = amount,
            date = data.get('date'),
            account_id = Account.get_by_id(self.account_id)
        )
        ob.add()

        return HTTPStatus.CREATED

    def get_deposite_history(self, filter=None):
        query = DepositeHistory.query.filter_by(account=self.account_id)
        page, per_page = 1, 2

        if filter:
            if 'page' in filter:
                page = int(filter['page'])
            if 'per_page' in filter:
                per_page = int(filter['per_page'])
            if 'start_date' in filter:
                query = query.filter(DepositeHistory.date >= filter['start_date'])
            if 'end_date' in filter:
                query = query.filter(DepositeHistory.date <= filter['end_date'])

        query = query.order_by(desc(DepositeHistory.date))

        total = query.count()
        if filter.get('page'):
            page = int(filter['page'])
        if filter.get('per_page'):
            per_page = int(filter['per_page'])
        deposite = query.paginate(page=page, per_page=per_page)

        data = {
            "deposites": [x.toDict() for x in deposite.items],
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
        
        