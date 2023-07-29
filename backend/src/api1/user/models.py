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
    email           = db.Column(db.String(100), nullable=False, unique=True)
    username        = db.Column(db.String(100), nullable=False)
    dob             = db.Column(db.Date)
    country         = db.Column(db.String(100))
    phone_number    = db.Column(db.String(20))

    # Validations
    @classmethod
    def __declare_last__(cls):
        ValidateEmail(User.email, True, True, "The email is not valid")
        ValidateString(User.username, True, True, "username must be type string")
        ValidateCountry(User.country, True, True, "Country is not valid")

    # set an empty string to null for username field
    @validates('username')
    def empty_string_to_null(self, key, value):
        if isinstance(value, str) and value == '':
            return None
        return value
    
    # How to serialize SqlAlchemy PostgreSQL Query to JSON
    def toDict(self):
        return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }
    
    def __repr__(self):
        return f'<{self.email}>'