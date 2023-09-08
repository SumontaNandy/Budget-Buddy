from werkzeug.exceptions import NotFound
from http import HTTPStatus

from ..model.account_type import AccountType
from ..model.account import Account


class AccountTypeUtil:
    """
        Handles Account Type related operations
    """
    def __init__(self, node=None):
        if node is None:
            query = AccountType.query.filter_by(parent_id=None)
            self.node = query.first().id
        else:
            self.node = node

    def get_account_types(self, filters=None):
        if filters.get('id') is not None:
            self.node = filters.get('id')

        account_types =  self.get_children_account_types()

        return account_types, HTTPStatus.OK
    
    def get_children_account_types(self):
        try:
            query = AccountType.query.filter_by(parent_id=self.node)

            children = query.all()
            children = [child.toDict() for child in children]

            return children
        except Exception as e:
            raise NotFound(str(e))
    
    def get_ancestor_account_types_util(self, id):
        ob = AccountType.get_by_id(id)

        if ob.get_parent_id() is None:
            return [ob.toDict()]
        
        parent = self.get_ancestor_account_types_util(ob.get_parent_id())
        parent.append(ob.toDict())

        return parent

    def get_ancestor_account_types(self):
        ancestors = self.get_ancestor_account_types_util(self.node)

        return ancestors
    
    def get_accounts_of_a_type(self, user_id):
        query = Account.query.filter_by(account_type=self.node).filter_by(user=user_id)

        accounts = query.all()
        accounts = [x.toDict() for x in accounts]

        return accounts
    
    def get_accounts_tree(self, user_id):
        dict = {
            'parent': self.get_ancestor_account_types(),
            'child': self.get_children_account_types(),
            'accounts': self.get_accounts_of_a_type(user_id)
        }

        return dict, HTTPStatus.OK