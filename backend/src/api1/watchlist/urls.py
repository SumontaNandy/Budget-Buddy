from flask import request, abort
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from http import HTTPStatus
from functools import wraps

from .controllers import *

api = Namespace('watchlist', description="User's watchlist related operations")

@api.route('/')
class WatchListCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all watchlists' list
        """
        pass
    
    @jwt_required()
    def post(self):
        """
            adds a new watchlist to the user
        """
        pass
    

@api.route('/<string:watchlist_id>')
class iWatchListRUD(Resource):
    @jwt_required()
    def get(self, watchlist_id):
        """
            get an watchlist's details with an watchlist_id
        """
        pass
    
    @jwt_required()
    def put(self, watchlist_id):
        """
            updates an watchlist's details with an watchlist_id
        """
        pass
    
    @jwt_required()
    def delete(self, watchlist_id):
        """
            deletes an watchlist with an watchlist_id
        """
        pass
