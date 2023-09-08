from marshmallow import fields
from marshmallow.schema import Schema

from ..model.enums import WatchlistType as WT


class WatchlistTagSchema(Schema):
    id = fields.String(dump_only=True)
    tag = fields.String()
    watchlist_id = fields.String()


class WatchlistSchema(Schema):
    id = fields.String(dump_only=True)
    name = fields.String()
    type = fields.String(enum=WT, required=True)
    target = fields.Float()
    tags = fields.List(fields.String())


watchlist_serializer = WatchlistSchema()
watchlist_arr_serializer = WatchlistSchema(many=True)