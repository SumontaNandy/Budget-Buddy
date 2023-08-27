from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..utils.authorize import authorize
from ..utils.expect import expect

from ..schema.watchlist import watchlist_serializer, watchlist_arr_serializer

from ..service.watchlist import *

from ..model.watchlist import Watchlist

api = Namespace('watchlist', description="User's watchlist related operations")


@api.route('/')
class WatchlistCR(Resource):
    @jwt_required()
    def get(self):
        """
            get all watchlists' list
        """
        user_id = get_jwt_identity()

        data, http_response = get_watchlists_controller(user_id)

        return watchlist_arr_serializer.dump(data), http_response
    
    @expect(watchlist_serializer)
    @jwt_required()
    def post(self):
        """
            adds a new watchlist to the user
        """
        user_id = get_jwt_identity()
        data = api.payload

        http_response = create_watchlist_controller(user_id, data)

        return http_response
    

@api.route('/<string:watchlist_id>')
class iWatchlistRUD(Resource):
    method_decorators = [authorize(Watchlist), jwt_required()]

    def get(self, watchlist_id):
        """
            get a watchlist's details with an watchlist_id
        """
        data, http_response = get_watchlist_controller(watchlist_id)

        return watchlist_serializer.dump(data), http_response
    
    @expect(watchlist_serializer)
    def put(self, watchlist_id):
        """
            updates a watchlist's details with an watchlist_id
        """
        data = api.payload

        http_response = update_watchlist_controller(watchlist_id, data)
        
        return http_response
    
    def delete(self, watchlist_id):
        """
            deletes a watchlist with an watchlist_id
        """
        pass