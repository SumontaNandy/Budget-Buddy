from marshmallow import fields
from marshmallow.schema import Schema

from .balance_segment import BalanceSegmentSchema

class AccountSchema(Schema):
    account_id = fields.String(attribute='id', dump_only=True)
    account_no = fields.String()
    account_name = fields.String()
    action = fields.String(load_only=True)
    balance = fields.Float(required=True)
    date = fields.DateTime()
    account_type_id = fields.String(required=True)
    account_type_name = fields.String()
    segment_list = fields.List(fields.Nested(BalanceSegmentSchema(only=('segment_name', 'amount'))))
    total_deposite = fields.Float(dump_only=True)


account_ip_serializer = AccountSchema(exclude=('account_type_name', 'segment_list'))
account_op_serializer = AccountSchema(exclude=('account_type_id',))
account_list_serializer = AccountSchema(many=True, exclude=('account_type_id', 'segment_list'))
