from sqlalchemy import inspect

from __init__ import db

class AccountType(db.Model):
    # Auto Generatd Fields
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)

    # Input by User
    parent_id = db.Column(db.String(100), db.ForeignKey('account_type.id'))
    name = db.Column(db.String(50))
    children = db.relationship("AccountType")

    def __repr__(self):
        return f'<AccountType {self.id} {self.name}>'
    
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    @classmethod
    def get_name_by_id(cls, id):
        ob = cls.query.get_or_404(id)

        return ob.name
    
    @classmethod
    def get_parent_id(cls, id):
        ob = cls.query.get_or_404(id)

        return ob.parent_id
    
    def toDict(self):
        return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

    def get_parent_id(self):
        return self.parent_id