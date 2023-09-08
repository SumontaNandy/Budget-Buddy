from werkzeug.exceptions import InternalServerError
from http import HTTPStatus
import uuid

from ..model.transaction import Transaction, TransactionTag
from ..model.user import User
from ..model.account import Account
from ..model.sp_transaction import SpTransaction
from ..model.spending_plan import SpendingPlan

from ..service.transaction_tag import TransactionTagUtil
from ..service.goal_transaction import GoalTransactionUtil
from ..service.sp_transaction import SPTransactionUtil

class TransactionUtil:
    def __init__(self, id=None):
        self.id = id

    def update_transaction_tags(self, transaction_id, tags):
        TransactionTagUtil().delete_tags(transaction_id)
        TransactionTagUtil().create_tags(transaction_id, tags)

    def create_transaction(self, user_id, data):
        try:
            id = str(uuid.uuid4())
            transaction = Transaction(
                id = id,
                user_id = User.get_by_id(user_id),
                account_id = Account.get_by_id(data.get('account_id'))
            )
            transaction.add() 

            if data.get('tags') is not None:
                self.update_transaction_tags(id, data.get('tags'))
                data.pop('tags')

            if data.get('tp') is not None:
                SPTransactionUtil().create_sp_transaction(id, data.get('tp'))
                data.pop('tp')

            if data.get('gp') is not None:
                GoalTransactionUtil().create_goal_transaction(id, data.get('gp'))
                data.pop('gp')

            ob = Transaction.get_by_id(id)
            for attr in ob.toDict().keys():
                if attr in data:
                    setattr(ob, attr, data[attr])
            ob.save()

            return HTTPStatus.CREATED    
        except Exception as e:
            raise InternalServerError(str(e))
        

    def get_transaction(self):
        transaction = Transaction.get_by_id(self.id).toDict()

        tags = TransactionTagUtil().get_tags(self.id)
        transaction['tags'] = tags

        tp = SPTransactionUtil().get_sp_transaction(self.id)
        if len(tp) > 0:
            transaction['tp'] = tp

        gp = GoalTransactionUtil().get_goal_transaction(self.id)
        if len(gp) > 0:
            transaction['gp'] = gp

        return transaction, HTTPStatus.OK
    
    def get_transaction_list(self, user_id, filters=None):
        query = Transaction.query.filter_by(user=user_id)
        if filters.get('start_date'):
            query = query.filter(Transaction.date >= filters.get('start_date'))
        if filters.get('end_date'):
            query = query.filter(Transaction.date <= filters.get('end_date'))
        if filters.get('payee'):
            query = query.filter(Transaction.payee.like('%'+filters.get('payee')+'%'))
        if filters.get('account_id'):
            query = query.filter(Transaction.account == filters.get('account_id'))

        page, per_page = 1, 10
        if filters.get('page'):
            page = int(filters.get('page'))
        if filters.get('per_page'):
            per_page = int(filters.get('per_page'))

        total = query.count()
        data = query.paginate(page=page, per_page=per_page)

        items = [item.toDict() for item in data.items]
        print(items)

        transaction_list = {
            'transactions': items,
            'page_info': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'has_next': data.has_next,
                'has_prev': data.has_prev,
                'page_list': [iter_page if iter_page else '...' for iter_page in data.iter_pages()]
            }
        }
        
        return transaction_list, HTTPStatus.OK
    
    def update_transaction(self, data):
        ob = Transaction.get_by_id(self.id)

        if data.get('tags') is not None:
            self.update_transaction_tags(self.id, data.get('tags'))
            data.pop('tags')

        if data.get('tp') is not None:
            SPTransactionUtil().update_sp_transaction(self.id, data.get('tp'))
            data.pop('tp')

        for attr in ob.toDict().keys():
            if attr in data:
                setattr(ob, attr, data[attr])
        ob.save()

        return HTTPStatus.OK