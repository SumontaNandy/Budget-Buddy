from sqlalchemy import inspect
from datetime import datetime

from __init__ import db

class User(db.Model):
    """
        Stores User Information
    """
    id      = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
    created = db.Column(db.DateTime(timezone=True), default=datetime.now)
    updated = db.Column(db.DateTime(timezone=True), default=datetime.now)

    email                   = db.Column(db.String(100), nullable=False, unique=True)
    password                = db.Column(db.Text(), nullable=False)

    user_first_name         = db.Column(db.String(100), default=None)
    user_middle_initial     = db.Column(db.String(100), default=None)
    user_last_name          = db.Column(db.String(100), default=None)

    spouse_first_name       = db.Column(db.String(100), default=None)
    spouse_middle_initial   = db.Column(db.String(100), default=None)
    spouse_last_name        = db.Column(db.String(100), default=None)

    father_first_name       = db.Column(db.String(100), default=None)
    father_middle_initial   = db.Column(db.String(100), default=None)
    father_last_name        = db.Column(db.String(100), default=None)

    mother_first_name       = db.Column(db.String(100), default=None)
    mother_middle_initial   = db.Column(db.String(100), default=None)
    mother_last_name        = db.Column(db.String(100), default=None)

    permanent_address_village_house     = db.Column(db.String(100), default=None)
    permanent_address_road_block_sector = db.Column(db.String(100), default=None)
    permanent_address_police_station    = db.Column(db.String(100), default=None)
    permanent_address_post_office       = db.Column(db.String(100), default=None)
    permanent_address_post_code         = db.Column(db.String(100), default=None)
    permanent_address_district          = db.Column(db.String(100), default=None)

    present_address_village_house       = db.Column(db.String(100), default=None)
    present_address_road_block_sector   = db.Column(db.String(100), default=None)
    present_address_police_station      = db.Column(db.String(100), default=None)
    present_address_post_office         = db.Column(db.String(100), default=None)
    present_address_post_code           = db.Column(db.String(100), default=None)
    present_address_district            = db.Column(db.String(100), default=None)

    contact_no  = db.Column(db.String(20), default=None)
    nid         = db.Column(db.String(20), default=None)
    tin         = db.Column(db.String(30), default=None)
    dob         = db.Column(db.Date, default=None)
    img         = db.Column(db.String(200), default=None) # stores img path
        
    def add(self):
        db.session.add(self)
        db.session.commit()

    def save(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def __repr__(self):
        return f'<User {self.id} {self.email}>'

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    def toDict(self):
        info = { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }
        dict = {}

        dict['id'] = info['id']
        dict['created'] = info['created']
        dict['updated'] = info['updated']
        dict['email'] = info['email']
        dict['password'] = info['password']

        dict['user'] = {
            'first_name': info['user_first_name'],
            'middle_initial': info['user_middle_initial'],
            'last_name': info['user_last_name']
        }

        dict['spouse'] = {
            'first_name': info['spouse_first_name'],
            'middle_initial': info['spouse_middle_initial'],
            'last_name': info['spouse_last_name']
        }

        dict['father'] = {
            'first_name': info['father_first_name'],
            'middle_initial': info['father_middle_initial'],
            'last_name': info['father_last_name']
        }
        
        dict['mother'] = {
            'first_name': info['mother_first_name'],
            'middle_initial': info['mother_middle_initial'],
            'last_name': info['mother_last_name']
        }
        
        dict['permanent_address'] = {
            'village_house': info['permanent_address_village_house'],
            'road_block_sector': info['permanent_address_road_block_sector'],
            'police_station': info['permanent_address_police_station'],
            'post_office': info['permanent_address_post_office'],
            'post_code': info['permanent_address_post_code'],
            'district': info['permanent_address_district'],
        }

        dict['present_address'] = {
            'village_house': info['present_address_village_house'],
            'road_block_sector': info['present_address_road_block_sector'],
            'police_station': info['present_address_police_station'],
            'post_office': info['present_address_post_office'],
            'post_code': info['present_address_post_code'],
            'district': info['present_address_district'],
        }

        dict['contact_no'] = info['contact_no']
        dict['nid'] = info['nid']
        dict['tin'] = info['tin']
        dict['dob'] = info['dob']
        dict['img'] = info['img']
        
        return dict