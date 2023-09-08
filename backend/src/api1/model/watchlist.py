from sqlalchemy import inspect
from datetime import datetime
from sqlalchemy.dialects.postgresql import ENUM

from __init__ import db

from .enums import WatchlistType as WT


class Watchlist(db.Model):
    __table_args__ = (
        db.CheckConstraint('target >= 0'),
    )
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    name = db.Column(db.String(120))
    type = db.Column(ENUM(*WT, create_type=False, name='watchlist_type'), nullable=False)
    target = db.Column(db.Numeric(), default=0)
    creation_date = db.Column(db.DateTime(timezone=True), default=datetime.now)

    user = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)

    user_id = db.relationship('User', foreign_keys=[user])

    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<Watchlist {self.id} {self.name}>'
    
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


class WatchlistTag(db.Model):
    id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    tags = db.Column(db.String(120))

    watchlist = db.Column(db.String, db.ForeignKey('watchlist.id'), nullable=False)

    watchlist_id = db.relationship('Watchlist', foreign_keys=[watchlist])

    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def toDict(self):
        data = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }
        return data