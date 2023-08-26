from marshmallow import fields
from marshmallow.schema import Schema

from ..model.enums import RecurrentFreq, RecurrentType

class RecurrentExpenseSchema(Schema):
    id = fields.String(dump_only=True)
    name = fields.String()
    amount = fields.Float()
    category = fields.String()
    next_date = fields.DateTime()
    end_date = fields.DateTime()
    frequency = fields.String(enum=RecurrentFreq)
    type = fields.String(enum=RecurrentType)


class RecurrentExpenseListSchema(Schema):
    recurrent_expenses = fields.List(fields.Nested(RecurrentExpenseSchema))
    page_info = fields.Dict()

recurrent_expense_serializer = RecurrentExpenseSchema()
recurrent_expense_list_serializer = RecurrentExpenseListSchema()