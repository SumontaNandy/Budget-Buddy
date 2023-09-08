from marshmallow import fields
from marshmallow.schema import Schema
from datetime import datetime

class PaginateSchema(Schema):
    total = fields.Integer(required=True)
    page = fields.Integer(required=True)
    per_page = fields.Integer(required=True)
    has_next = fields.Boolean(required=True)
    has_prev = fields.Boolean(required=True)
    page_list = fields.List(fields.Integer(), required=True)
