from flask import Blueprint
from flask_restx import Api

from .route.auth import api as ns_auth
from .route.account_type import api as ns_account_type
from .route.account import api as ns_account
from .route.onetime_expense import api as ns_onetime_expense
from .route.recurrent_expense import api as ns_recurrent_expense
from .route.transaction import api as ns_transaction
from .route.watchlist import api as ns_watchlist
from .route.goal import api as ns_goal
from .route.user import api as ns_user
from .route.report import api as ns_report

blueprint = Blueprint('api1', __name__, url_prefix='/api/1/user')

authorizations = {
    "Bearer Auth": {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization',
    }
}

api = Api(blueprint,
          version='1.0',
          title='Budget Buddy API',
          authorizations=authorizations,
          security='Bearer Auth',
          doc='/docs')


api.add_namespace(ns_auth, path='/auth')
api.add_namespace(ns_account_type, path='/account-types')
api.add_namespace(ns_account, path='/account')
api.add_namespace(ns_onetime_expense, path='/spending-plan/one')
api.add_namespace(ns_recurrent_expense, path='/spending-plan/recur')
api.add_namespace(ns_transaction, path='/transaction')
api.add_namespace(ns_watchlist, path='/watchlist')
api.add_namespace(ns_goal, path='/goal')
api.add_namespace(ns_user, path='/info')
api.add_namespace(ns_report, path='/report')