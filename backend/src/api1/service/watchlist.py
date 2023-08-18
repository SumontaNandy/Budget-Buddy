from werkzeug.exceptions import InternalServerError
from http import HTTPStatus
import uuid

from ..model.watchlist import Watchlist, WatchlistTag
from ..model.user import User

def create_a_watchlist_tag_util(watchlist_id, data):
    wl_tag = WatchlistTag(
        id = str(uuid.uuid4()),
        tags = data,
        watchlist_id = Watchlist.get_by_id(watchlist_id)
    )
    wl_tag.add()


def create_watchlist_tags_util(watchlist_id, data):
    for tag in data:
        create_a_watchlist_tag_util(watchlist_id, tag)


def delete_watchlist_tags_util(watchlist_id):
    tags = WatchlistTag.query.filter_by(watchlist=watchlist_id).all()
    
    for tag in tags:
        tag.delete()


def create_watchlist_controller(user_id, data):
    try:
        id = str(uuid.uuid4())
        watchlist = Watchlist(
            id = id,
            type = data.get('type'),
            user_id = User.get_by_id(user_id)
        )
        watchlist.add()

        update_watchlist_controller(id, data)

        return HTTPStatus.CREATED
    except Exception as e:
        raise InternalServerError(str(e))
    

def get_watchlist_controller(watchlist_id):
    watchlist = Watchlist.get_by_id(watchlist_id).toDict()

    tags = WatchlistTag.query.filter_by(watchlist=watchlist_id).all()
    tags = [x.toDict().get('tags') for x in tags]

    watchlist['tags'] = tags

    return watchlist, HTTPStatus.OK


def update_watchlist_controller(watchlist_id, data):
    watchlist = Watchlist.get_by_id(watchlist_id)

    if data.get('tags') is not None:
        delete_watchlist_tags_util(watchlist_id)
        create_watchlist_tags_util(watchlist_id, data.get('tags'))
        data.pop('tags')

    for key in data.keys():
        if key in watchlist.toDict():
            setattr(watchlist, key, data[key])
    watchlist.save()

    return HTTPStatus.OK