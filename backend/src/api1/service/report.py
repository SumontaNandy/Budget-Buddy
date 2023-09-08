from werkzeug.exceptions import BadRequest
from datetime import datetime
from sqlalchemy import desc
import uuid
from http import HTTPStatus

from .account import AccountUtil

from ..model.deposite_history import DepositeHistory
from ..model.transaction import Transaction
from ..service.sp_transaction import SPTransactionUtil
from ..service.goal_transaction import GoalTransactionUtil
from ..service.transaction import TransactionUtil


class ReportUtil:
    def __init__(self, user_id):
        self.user_id = user_id        

    def get_deposite_list(self, filter):
        accounts = AccountUtil().get_accounts(user_id=self.user_id)[0]

        depo = []
        
        for i in range(12):
            depo.append(0)

        for acc in accounts:
            id = acc.get('id')

            dh = DepositeHistory.query.filter_by(account=id)
            dh = [ob.toDict() for ob in dh]
            
            for x in dh:
                if x.get('date').year == filter:
                    month = x.get('date').month
                    depo[month-1] += float(x.get('amount'))

            return depo
        
    def get_cost(self, filter):
        query = Transaction.query.filter_by(user=self.user_id).all()

        tran = [x.toDict() for x in query]

        depo = []
        
        for i in range(12):
            depo.append(0)

        for t in tran:
            if t.get('date').year == filter:
                tran_id = t.get('id')
                tp = SPTransactionUtil().get_sp_transaction(tran_id)
                if len(tp) > 0:
                    month = t.get('date').month
                    for i in tp:
                        depo[month-1] += float(i.get('amount'))

                gp = GoalTransactionUtil().get_goal_transaction(tran_id)
                if len(gp) > 0:
                    month = t.get('date').month
                    for i in gp:
                        depo[month-1] += float(i.get('amount'))

        return depo

    def get_summary(self, filter=None):
        year = filter.get('year')
        depo = self.get_deposite_list(year)
        cost = self.get_cost(year)    

        dict = []

        names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                  'November', 'December']

        for i in range(12):
            dict.append({
                'month': names[i],
                'income': depo[i],
                'expense': cost[i]
            })

        return dict, HTTPStatus.OK