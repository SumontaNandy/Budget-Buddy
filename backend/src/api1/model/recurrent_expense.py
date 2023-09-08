from sqlalchemy import inspect
from datetime import datetime
from sqlalchemy.dialects.postgresql import ENUM

from __init__ import db

from .enums import RecurrentFreq as RF, RecurrentType as RT

class RecurrentExpense(db.Model):
    id = db.Column(db.String(100), db.ForeignKey('spending_plan.id'), primary_key=True, nullable=False, unique=True)
    next_date = db.Column(db.DateTime(timezone=True), default=datetime.now)
    end_date = db.Column(db.Date)
    frequency = db.Column(ENUM(*RF, create_type=False, name="recurrent_freq"), nullable=False)
    type = db.Column(ENUM(*RT, create_type=False, name="recurrent_type"), nullable=False)

    spending_plan_id = db.relationship('SpendingPlan', foreign_keys=[id])

    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f"<RecurrentExpense {self.id}>"
    
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    def toDict(self):
        data = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

        return data