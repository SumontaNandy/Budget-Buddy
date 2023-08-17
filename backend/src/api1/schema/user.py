from marshmallow import fields
from marshmallow.schema import Schema

class NameSchema(Schema):
    first_name = fields.Str()
    middle_initial = fields.Str()
    last_name = fields.Str()

class AddressSchema(Schema):
    village_house = fields.Str()
    road_block_sector = fields.Str()
    police_station = fields.Str()
    post_office = fields.Str()
    post_code = fields.Str()
    district = fields.Str()

class UserSchema(Schema):
    id = fields.Str(dump_only=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True)
    user = fields.Nested(NameSchema)
    spouse = fields.Nested(NameSchema)
    father = fields.Nested(NameSchema)
    mother = fields.Nested(NameSchema)
    permanent_address = fields.Nested(AddressSchema)
    present_address = fields.Nested(AddressSchema)
    contact_no = fields.Str()
    nid = fields.Str() 
    tin = fields.Str()
    dob = fields.Str()
    img = fields.Str()


signup_serializer = UserSchema(only=("email", "password"))
login_serializer = UserSchema(only=("email", "password"))