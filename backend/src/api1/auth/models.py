from sqlalchemy import inspect
from datetime import datetime
from flask_validator import ValidateEmail, ValidateString, ValidateCountry
from sqlalchemy.orm import validates

from ... import db

class User(db.Model):
    # Auto Generated Fields:
    id      = db.Column(db.String(50), primary_key=True, nullable=False, unique=True)
    created = db.Column(db.DateTime(timezone=True), default=datetime.now)
    updated = db.Column(db.DateTime(timezone=True), default=datetime.now)

    # Input by User Fields
    email                   = db.Column(db.String(100), nullable=False, unique=True)

    user_first_name         = db.Column(db.String(100), default=None)
    user_middle_initial     = db.Column(db.String(100), default=None)
    user_last_name          = db.Column(db.String(100), default=None)

    spouse_first_name       = db.Column(db.String(100), default=None)
    spouse_middle_initial   = db.Column(db.String(100), default=None)
    spouse_last_name        = db.Column(db.String(100), default=None)

    father_first_name       = db.Column(db.String(100), default=None)
    father_middle_initial   = db.Column(db.String(100), default=None)
    father_last_name        = db.Column(db.String(100), default=None)

    mother_first_name       = db.Column(db.String(100), default=None)
    mother_middle_initial   = db.Column(db.String(100), default=None)
    mother_last_name        = db.Column(db.String(100), default=None)

    permanent_address_village_house     = db.Column(db.String(100), default=None)
    permanent_address_road_block_sector = db.Column(db.String(100), default=None)
    permanent_address_police_station    = db.Column(db.String(100), default=None)
    permanent_address_post_office       = db.Column(db.String(100), default=None)
    permanent_address_post_code         = db.Column(db.String(100), default=None)
    permanent_address_district          = db.Column(db.String(100), default=None)

    present_address_village_house       = db.Column(db.String(100), default=None)
    present_address_road_block_sector   = db.Column(db.String(100), default=None)
    present_address_police_station      = db.Column(db.String(100), default=None)
    present_address_post_office         = db.Column(db.String(100), default=None)
    present_address_post_code           = db.Column(db.String(100), default=None)
    present_address_district            = db.Column(db.String(100), default=None)

    contact_no  = db.Column(db.String(20), default=None)
    nid         = db.Column(db.String(20), default=None)
    tin         = db.Column(db.String(30), default=None)
    dob         = db.Column(db.Date, default=None)
    img         = db.Column(db.String(100), default=None) # stores img path

    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def __repr__(self):
        return f'<User {self.id} {self.email}>'
    
    # Validations
    @classmethod
    def __declare_last__(cls):
        ValidateEmail(User.email, True, True, "The email is not valid")

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)