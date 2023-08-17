from marshmallow import fields
from marshmallow.schema import Schema

from .balance_segment import BalanceSegmentSchema

class AccountSchema(Schema):
    account_id = fields.String(attribute='id', dump_only=True)
    account_no = fields.String()
    account_name = fields.String()
    balance = fields.Float(required=True)
    date = fields.DateTime()
    account_type_id = fields.String(required=True)
    account_type_name = fields.String()
    segment_list = fields.List(fields.Nested(BalanceSegmentSchema(only=('segment_name', 'amount'))))


account_ip_serializer = AccountSchema(exclude=('account_type_name', 'segment_list'))
account_op_serializer = AccountSchema(exclude=('account_type_id',))