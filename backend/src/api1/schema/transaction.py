from marshmallow import fields
from marshmallow.schema import Schema

from ..model.enums import PaidStatus

class SpTransactionSchema(Schema):
    id = fields.String(dump_only=True)
    amount = fields.Float()
    spending_plan_id = fields.String()
    transaction_id = fields.String(dump_only=True)

class GoalTransactionSchema(Schema):
    id = fields.String(dump_only=True)
    amount = fields.Float()
    goal_id = fields.String()
    transaction_id = fields.String(dump_only=True)   


class TransactionSchema(Schema):
    id = fields.String(dump_only=True)
    account_id = fields.String()
    date = fields.DateTime()
    status = fields.String(enum=PaidStatus)
    payee = fields.String()
    description = fields.String()
    attachment = fields.String()
    tags = fields.List(fields.String())
    tp = fields.List(fields.Nested(SpTransactionSchema()))
    gp = fields.List(fields.Nested(GoalTransactionSchema()))


transaction_serializer = TransactionSchema()
transaction_list_serializer = TransactionSchema(many=True)