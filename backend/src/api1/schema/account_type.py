from marshmallow import fields
from marshmallow.schema import Schema

from .account import AccountSchema

class AccountTypeSchema(Schema):
    id = fields.Str()
    name = fields.Str()
    parent_id = fields.Str()


account_type_serializer = AccountTypeSchema(many=True, only=('id', 'name'))


class AccountTypeTreeSchema(Schema):
    parent = fields.List(fields.Nested(AccountTypeSchema(only=('id', 'name'))))
    child = fields.List(fields.Nested(AccountTypeSchema(only=('id', 'name'))))
    accounts = fields.List(fields.Nested(AccountSchema(only=('account_id', 'account_name', 'balance'))))


account_type_tree_serializer = AccountTypeTreeSchema()