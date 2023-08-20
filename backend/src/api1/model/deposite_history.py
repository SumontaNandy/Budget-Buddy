from sqlalchemy import inspect
from datetime import datetime

from __init__ import db

class DepositeHistory(db.Model):
    __table_args__ = (
        db.CheckConstraint('amount >= 0'),
    )
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    date = db.Column(db.DateTime(timezone=True), default=datetime.now)
    amount = db.Column(db.Float, nullable=False)

    account = db.Column(db.String, db.ForeignKey('account.id'), nullable=False)
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
        return f'<GoalTransaction {self.id}>'
    
    def toDict(self):
        data = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }
        return data

