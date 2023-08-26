from marshmallow import fields
from marshmallow.schema import Schema

from ..schema.paginate import PaginateSchema

class GoalSchema(Schema):
    id = fields.String(dump_only=True)
    account_id = fields.String()
    category = fields.String()
    name = fields.String()
    goal_amount = fields.Float()
    saved_so_far = fields.Float()
    spent_so_far = fields.Float()
    target_date = fields.DateTime()
    monthly_contribution = fields.Float()
    withdraw_type = fields.String()


class GoalListSchema(Schema):
    goal_list = fields.List(fields.Nested(GoalSchema()))
    page_info = fields.Nested(PaginateSchema())

goal_serializer = GoalSchema()
goal_list_serializer = GoalListSchema()