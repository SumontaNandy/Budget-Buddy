from sqlalchemy import inspect

from __init__ import db

class GoalTransaction(db.Model):
    __table_args__ = (
        db.CheckConstraint('amount >= 0'),
    )
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    amount = db.Column(db.Numeric(), nullable=False)

    transaction = db.Column(db.String, db.ForeignKey('transaction.id'), nullable=False)
    goal = db.Column(db.String, db.ForeignKey('goal.id'), nullable=False)

    transaction_id = db.relationship('Transaction', foreign_keys=[transaction])
    goal_id = db.relationship('Goal', foreign_keys=[goal])

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

