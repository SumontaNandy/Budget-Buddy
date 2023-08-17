from marshmallow import fields
from marshmallow.schema import Schema

from .balance_segment import BalanceSegmentSchema

class AccountSchema(Schema):
    account_id = fields.String(attribute=id)
    account_no = fields.String()
    account_name = fields.String()
    balance = fields.Float()
    date = fields.DateTime()
    account_type_name = fields.String()
    segment_list = fields.List(fields.Nested(BalanceSegmentSchema))