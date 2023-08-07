from flask import request, jsonify
from flask_restx import fields
from werkzeug.exceptions import Conflict, BadRequest
from werkzeug.security import generate_password_hash, check_password_hash
from http import HTTPStatus
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
import uuid

from .models import User

def extract_user_data(data):
    dict = {}

    dict['email']       = data.get('email')
    dict['password']    = generate_password_hash(data.get('password'))

    if data.get('user') is not None:
        dict['user_first_name']     = data.get('user').get('first_name')
        dict['user_middle_initial'] = data.get('user').get('middle_initial')
        dict['user_last_name']      = data.get('user').get('last_name')

    if data.get('spouse') is not None:
        dict['spouse_first_name']       = data.get('spouse').get('first_name')
        dict['spouse_middle_initial']   = data.get('spouse').get('middle_initial')
        dict['spouse_last_name']        = data.get('spouse').get('last_name')

    if data.get('father') is not None:
        dict['father_first_name']       = data.get('father').get('first_name')
        dict['father_middle_initial']   = data.get('father').get('middle_initial')
        dict['father_last_name']        = data.get('father').get('last_name')

    if data.get('mother') is not None:
        dict['mother_first_name']       = data.get('mother').get('first_name')
        dict['mother_middle_initial']   = data.get('mother').get('middle_initial')
        dict['mother_last_name']        = data.get('mother').get('last_name')

    if data.get('permanent_address') is not None:
        dict['permanent_address_village_house']     = data.get('permanent_address').get('village_house')
        dict['permanent_address_road_block_sector'] = data.get('permanent_address').get('road_block_sector')
        dict['permanent_address_police_station']    = data.get('permanent_address').get('police_station')
        dict['permanent_address_post_office']       = data.get('permanent_address').get('post_office')
        dict['permanent_address_post_code']         = data.get('permanent_address').get('post_code')
        dict['permanent_address_district']          = data.get('permanent_address').get('district')

    if data.get('present_address') is not None:
        dict['present_address_village_house']       = data.get('present_address').get('village_house')
        dict['present_address_road_block_sector']   = data.get('present_address').get('road_block_sector')
        dict['present_address_police_station']      = data.get('present_address').get('police_station')
        dict['present_address_post_office']         = data.get('present_address').get('post_office')
        dict['present_address_post_code']           = data.get('present_address').get('post_code')
        dict['present_address_district']            = data.get('present_address').get('district')

        dict['contact_no']  = data.get('contact_no')
        dict['nid']         = data.get('nid')
        dict['tin']         = data.get('tin')
        dict['dob']         = data.get('dob')   
        dict['img']         = data.get('img')

    return dict


def create_new_user_controller(data):
    try:
        id = str(uuid.uuid4())
        data = extract_user_data(data)    
        
        new_user = User(id=id, email=data.get("email"), password=data.get("password"))
        new_user.add()

        new_user = User.get_by_id(id)
        for key in data.keys():
            setattr(new_user, key, data[key])

        new_user.save()

        return HTTPStatus.CREATED
    except Exception as e:
        raise Conflict(f"User with email {data.get('email')} exists")
    

def user_login_controller(data):
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if (user is not None) and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id, fresh=True)
        refresh_token = create_refresh_token(identity=user.id)

        tokens = {
            'access_token': access_token,
            'refresh_token': refresh_token
        }

        return tokens, HTTPStatus.OK
    
    raise BadRequest("Invalid Username or Password")