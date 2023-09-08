from marshmallow import fields
from marshmallow.schema import Schema

class OneTimeExpenseSchema(Schema):
    id = fields.String(dump_only=True)
    name = fields.String()
    amount = fields.Float()
    amount_left = fields.Float(dump_only=True)
    amount_used = fields.Float(dump_only=True)
    category = fields.String()
    amount_used_within_range = fields.Float(dump_only=True)

class OneTimeExpenseListSchema(Schema):
    one_time_expenses = fields.List(fields.Nested(OneTimeExpenseSchema))
    page_info = fields.Dict()


onetime_expense_serializer = OneTimeExpenseSchema()
onetime_expense_list_serializer = OneTimeExpenseListSchema()