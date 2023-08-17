from marshmallow import fields
from marshmallow.schema import Schema

class OneTimeExpenseSchema(Schema):
    id = fields.String(dump_only=True)
    name = fields.String(required=True)
    amount = fields.Float(required=True)
    amount_left = fields.Float(dump_only=True)


onetime_expense_serializer = OneTimeExpenseSchema()