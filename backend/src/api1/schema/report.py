from marshmallow import fields
from marshmallow.schema import Schema


class ReportSchema(Schema):
    month = fields.String()
    income = fields.Float()
    expense = fields.Float()

report_list_serializer = ReportSchema(many=True)