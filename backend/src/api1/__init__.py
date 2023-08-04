from flask import Blueprint
from flask_restx import Api

from .auth.urls import api as ns_auth
from .account.urls import api as ns_account
from .transaction.urls import api as ns_transaction
from .spending_plan.urls import api as ns_spending_plan
from .goal.urls import api as ns_goal
from .watchlist.urls import api as ns_watchlist

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
api.add_namespace(ns_account, path='/account')
api.add_namespace(ns_transaction, path='/transaction')
api.add_namespace(ns_spending_plan, path='/spending-plan')
api.add_namespace(ns_goal, path='/goal')
api.add_namespace(ns_watchlist, path='/watchlist')