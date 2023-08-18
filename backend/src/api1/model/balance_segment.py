from datetime import datetime
from sqlalchemy import inspect

from __init__ import db

class BalanceSegment(db.Model):
    __table_args__ = (
        db.CheckConstraint('amount >= 0'),
    )
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    segment_name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Numeric(), nullable=False)
    last_edit_time = db.Column(db.DateTime(timezone=True), default=datetime.now)

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
        return f"<BalanceSegment {self.id}>"
    
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    def toDict(self):
        info = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

        data = {}
        data['segment_name'] = info['segment_name']
        data['amount'] = info['amount']

        return data