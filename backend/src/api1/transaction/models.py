from sqlalchemy import inspect
from datetime import datetime
from flask_validator import ValidateNumeric
from sqlalchemy.orm import validates
import enum

from ... import db
from ..auth.models import User


class TransactionStatus(enum.Enum):
    UPCOMING = 'Upcoming'
    PAID = 'Paid'


class Transaction(db.Model):
    id = db.Column(db.String(200), primary_key=True, nullable=False, unique=True)
    date = db.Column(db.DateTime(timezone=True), default=datetime.now)
    status = db.Column(db.Enum(TransactionStatus))
    payee = db.Column(db.String(100))
    description = db.Column(db.Text)
    attachment = db.Column(db.Text)

    user = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
    account = db.Column(db.String, db.ForeignKey('account.id'))

    user_id = db.Relationship('User', foreign_keys=[user])
    account_id = db.Relationship('Account', foreign_keys=[account])


class SpendingPlanTransaction(db.Model):
    __table_args__ = (
        db.CheckConstraint('amount >= 0'),
    )
    id = db.Column(db.String(200), primary_key=True, nullable=False, unique=True)
    amount = db.Column(db.Numeric(), nullable=False)

    transaction = db.Column(db.String, db.ForeignKey('transaction.id'), nullable=False)
    spending_plan = db.Column(db.String, db.ForeignKey('spending_plan.id'))

    transaction_id = db.Relationship('Transaction', foreign_keys=[transaction])
    spending_plan_id = db.Relationship('SpendingPlan', foreign_keys=[spending_plan])
