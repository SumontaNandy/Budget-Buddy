from sqlalchemy import inspect
from datetime import datetime
from flask_validator import ValidateNumeric
from sqlalchemy.orm import validates

from ... import db
from ..account_type.models import AccountType


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
    
    def toDict(self):
        data = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }
        return data
    
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
        return ob.user


class BalanceSegment(db.Model):
    __table_args__ = (
        db.CheckConstraint('amount >= 0'),
    )
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    segment_name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Numeric(), nullable=False)
    last_edit_time = db.Column(db.DateTime(timezone=True), default=datetime.now)

    account = db.Column(db.String, db.ForeignKey('account.id'), nullable=False)
    account_id = db.Relationship('Account', foreign_keys=[account])

    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f"<BalanceSegment {self.id}>"
    
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    def toDict(self):
        info = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

        data = {}
        data['segment_name'] = info['segment_name']
        data['amount'] = info['amount']

        return data