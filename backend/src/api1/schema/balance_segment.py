from marshmallow import fields
from marshmallow.schema import Schema

class BalanceSegmentSchema(Schema):
    segment_name = fields.String()
    amount = fields.Float()
    last_edit_time = fields.DateTime()