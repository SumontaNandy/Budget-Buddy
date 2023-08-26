from sqlalchemy import inspect
from datetime import datetime
from sqlalchemy.dialects.postgresql import ENUM

from __init__ import db

from .enums import PaidStatus 

class Transaction(db.Model):
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    date = db.Column(db.DateTime(timezone=True), default=datetime.now)
    status = db.Column(ENUM(*PaidStatus, create_type=False, name="paid_status"), server_default="PENDING")
    payee = db.Column(db.String(100))
    description = db.Column(db.Text())
    attachment = db.Column(db.Text()) # stores the attachment url

    user = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
    account = db.Column(db.String, db.ForeignKey('account.id'))

    user_id = db.relationship('User', foreign_keys=[user])
    account_id = db.relationship('Account', foreign_keys=[account])

    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<Transaction {self.id}>'
    
    def toDict(self):
        data = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }
        return data

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    @classmethod
    def get_owner(cls, id):
        ob = cls.query.get_or_404(id)
        return ob.user


class TransactionTag(db.Model):
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    tags = db.Column(db.String(120))

    transaction = db.Column(db.String, db.ForeignKey('transaction.id'), nullable=False)

    transaction_id = db.relationship('Transaction', foreign_keys=[transaction])

    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def toDict(self):
        data = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }
        return data