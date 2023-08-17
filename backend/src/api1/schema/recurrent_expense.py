from marshmallow import fields
from marshmallow.schema import Schema

from ..model.enums import RecurrentFreq, RecurrentType

class RecurrentExpenseSchema(Schema):
    id = fields.String(dump_only=True)
    name = fields.String(required=True)
    amount = fields.Float(required=True)
    next_date = fields.DateTime(required=True)
    end_date = fields.DateTime()
    frequency = fields.String(enum=RecurrentFreq, required=True)
    type = fields.String(enum=RecurrentType, required=True)


recurrent_expense_serializer = RecurrentExpenseSchema()