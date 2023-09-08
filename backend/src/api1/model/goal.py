from sqlalchemy import inspect
from datetime import datetime

from __init__ import db


class Goal(db.Model):
    __table_args__ = (
        db.CheckConstraint('goal_amount >= 0'),
        db.CheckConstraint('saved_so_far >= 0'),
        db.CheckConstraint('spent_so_far >= 0'),
        db.CheckConstraint('monthly_contribution >= 0')
    )
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    name = db.Column(db.String(100))
    category = db.Column(db.String(120))
    goal_amount = db.Column(db.Numeric(), nullable=False)
    saved_so_far = db.Column(db.Numeric(), default=0)
    spent_so_far = db.Column(db.Numeric(), default=0)
    target_date = db.Column(db.DateTime(timezone=True), default=datetime.now)
    monthly_contribution = db.Column(db.Numeric(), default=0)

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
        return f'<Goal {self.id} {self.name}>'
    
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

