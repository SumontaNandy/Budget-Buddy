from flask import request, jsonify
import uuid

from ... import db
from .models import User

def list_all_users_controller():
    users = User.query.all()
    response = []
    for user in users:
        response.append(user.toDict())

    return jsonify(response)


def create_user_controller():
    request_form = request.form.to_dict()

    id = str(uuid.uuid4())
    new_user = User(
        id = id,
        email = request_form['email'],
        username = request_form['username'],
        dob = request_form['dob'],
        country = request_form['country'],
        phone_number = request_form['phone_number'],
    )

    db.session.add(new_user)
    db.session.commit()

    response = User.query.get(id).toDict()
    
    return jsonify(response)


def retrive_user_controller(user_id):
    response = User.query.get(user_id).toDict()

    return jsonify(response)


def update_user_controller(user_id):
    request_form = request.form.to_dict()
    user = User.query.get(user_id)

    user.email = request_form['email']
    user.username = request_form['username']
    user.dob = request_form['dob']
    user.country = request_form['country']
    user.phone_number = request_form['phone_number']
    
    db.session.commit()

    response = User.query.get(user_id).toDict()
    
    return jsonify(response)


def delete_user_controller(user_id):
    User.query.filter_by(id=user_id).delete()

    db.session.commit()

    return f'User with ID {user_id} deleted successfully!'