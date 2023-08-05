from sqlalchemy import inspect
from datetime import datetime
from flask_validator import ValidateNumeric
from sqlalchemy.orm import validates

from ... import db

class AccountType(db.Model):
    # Auto Generatd Fields
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)

    # Input by User
    parent_id = db.Column(db.String(100), db.ForeignKey('account_type.id'))
    name = db.Column(db.String(50))
    children = db.relationship("AccountType")

    def __repr__(self):
        return f'<AccountType {self.id} {self.name}>'
    
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)


class Account(db.Model):
    __table_args__ = (
        db.CheckConstraint('balance >= 0'),
    )
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    account_no = db.Column(db.String(100))
    account_name = db.Column(db.String(120))
    balance = db.Column(db.Numeric(), nullable=False)
    date = db.Column(db.DateTime(timezone=True), default=datetime.now)

    user = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
    account_type = db.Column(db.String, db.ForeignKey('account_type.id'))

    user_id = db.Relationship('User', foreign_keys=[user])
    account_type_id = db.Relationship('AccountType', foreign_keys=[account_type])

    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<Account {self.id} {self.account_name}>'
    
    # Validations
    @classmethod
    def __declare_last__(cls):
        ValidateNumeric(Account.balance, False, True, "Balance is not valid")

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    @classmethod
    def get_owner(cls, id):
        ob = cls.query.get_or_404(id)
        if ob is None:
            return None
        return ob.user
