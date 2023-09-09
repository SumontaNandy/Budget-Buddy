from marshmallow import fields
from marshmallow.schema import Schema

from ..model.enums import PaidStatus

class SpTransactionSchema(Schema):
    id = fields.String(dump_only=True)
    amount = fields.Float()
    spending_plan = fields.String()
    transaction = fields.String(dump_only=True)
    type = fields.String(dump_only=True)

class GoalTransactionSchema(Schema):
    id = fields.String(dump_only=True)
    amount = fields.Float()
    goal = fields.String()
    withdraw_for = fields.String()
    transaction_id = fields.String(dump_only=True)   


class TransactionSchema(Schema):
    id = fields.String(dump_only=True)
    account_id = fields.String(attribute='account')
    amount = fields.Float()
    date = fields.DateTime()
    status = fields.String(enum=PaidStatus)
    payee = fields.String()
    description = fields.String()
    attachment = fields.String()
    tags = fields.List(fields.String())
    tp = fields.List(fields.Nested(SpTransactionSchema()))
    gp = fields.List(fields.Nested(GoalTransactionSchema()))

class TransactionListSchema(Schema):
    transactions = fields.List(fields.Nested(TransactionSchema()))
    page_info = fields.Dict()


transaction_serializer = TransactionSchema()
transaction_list_serializer = TransactionListSchema()