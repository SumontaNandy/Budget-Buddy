from marshmallow import fields
from marshmallow.schema import Schema

class ReportSchema(Schema):
    income = fields.Float()
    expense = fields.Float()
    month = fields.String()


report_serializer = ReportSchema(many=True)