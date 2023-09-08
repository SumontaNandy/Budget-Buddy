from sqlalchemy import inspect

from __init__ import db


class OneTimeExpense(db.Model):
    id = db.Column(db.String(100), db.ForeignKey('spending_plan.id'), primary_key=True, nullable=False, unique=True)

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
        return f"<OneTimeExpense {self.id}>"
    
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    def toDict(self):
        data = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

        return data
