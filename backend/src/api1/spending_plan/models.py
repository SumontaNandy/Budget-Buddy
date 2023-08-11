from sqlalchemy import inspect
from datetime import datetime
from flask_validator import ValidateNumeric
from sqlalchemy.orm import validates
import enum

from ... import db
from ..auth.models import User

class SpendingPlan(db.Model):
    __table_args__ = (
        db.CheckConstraint('amount >= 0'),
    )
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    name = db.Column(db.String(120))
    category = db.Column(db.String(120))
    amount = db.Column(db.Numeric(), nullable=False)
    creation_time = db.Column(db.DateTime(timezone=True), default=datetime.now)

    user = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)

    user_id = db.Relationship('User', foreign_keys=[user])

    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<SpendingPlan {self.id} {self.name}>'
    
    def toDict(self):
        data = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }
        return data
    
    # Validations
    @classmethod
    def __declare_last__(cls):
        ValidateNumeric(SpendingPlan.amount, False, True, "Amount is not valid")

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    @classmethod
    def get_owner(cls, id):
        ob = cls.query.get_or_404(id)
        return ob.user


class RecurrentType(enum.Enum):
    BILL = 'Bill'
    SUBSCRIPTION = 'Subscription'


class RecurrentFreq(enum.Enum):
    WEEKLY = 'Weekly'
    BI_WEEKLY = 'Bi-Weekly'
    TWICE_A_MONTH = 'Twice a Month'
    MONTHLY = 'Monthly'
    MONTHS2 = 'Every 2 Months'
    QUARTERLY = "Quarterly"
    MONTHS6 = 'Every 6 Months'
    YEARLY = 'Yearly'   


class RecurrentExpense(db.Model):
    id = db.Column(db.String(100), db.ForeignKey('spending_plan.id'), primary_key=True, nullable=False, unique=True)
    next_date = db.Column(db.DateTime(timezone=True), default=datetime.now)
    end_date = db.Column(db.Date)
    frequency = db.Column(db.Enum(RecurrentFreq), nullable=False)
    type = db.Column(db.Enum(RecurrentType), nullable=False)

    spending_plan_id = db.Relationship('SpendingPlan', foreign_keys=[id])

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
    

class OneTimeExpense(db.Model):
    id = db.Column(db.String(100), db.ForeignKey('spending_plan.id'), primary_key=True, nullable=False, unique=True)

    spending_plan_id = db.Relationship('SpendingPlan', foreign_keys=[id])

    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f"<OneTimeExpense {self.id}>"
    
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    def toDict(self):
        data = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

        return data
