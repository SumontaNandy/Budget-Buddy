from marshmallow import fields
from marshmallow.schema import Schema
from datetime import datetime

from ..schema.paginate import PaginateSchema

class DepositeSchema(Schema):
    amount = fields.Float(required=True)
    date = fields.DateTime(default=datetime.now)

class DepositeHistorySchema(Schema):
    deposites = fields.List(fields.Nested(DepositeSchema()))
    page_info = fields.Dict()

deposite_serializer = DepositeSchema()
deposite_list_serializer = DepositeHistorySchema()