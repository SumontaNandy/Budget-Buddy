from sqlalchemy import inspect

from __init__ import db

class SpTransaction(db.Model):
    __table_args__ = (
        db.CheckConstraint('amount >= 0'),
    )
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    amount = db.Column(db.Numeric(), nullable=False)

    transaction = db.Column(db.String, db.ForeignKey('transaction.id'), nullable=False)
    spending_plan = db.Column(db.String, db.ForeignKey('spending_plan.id'), nullable=False)

    transaction_id = db.relationship('Transaction', foreign_keys=[transaction])
    spending_plan_id = db.relationship('SpendingPlan', foreign_keys=[spending_plan])

    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<SpTransaction {self.id}>'
    
    def toDict(self):
        data = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }
        return data

