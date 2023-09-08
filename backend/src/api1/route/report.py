from flask import request
from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..utils.authorize import authorize
from ..utils.expect import expect
from ..utils.serialize import serialize

from ..schema.report import report_list_serializer

from ..service.report import *

api = Namespace('report', description="User's balance summary related operations")


@api.route('/')
class Report(Resource):
    @jwt_required()
    def get(self):
        """
            get all expenses and incomes
        """
        user_id = get_jwt_identity()
        filter = request.args

        data, http_response = ReportUtil(user_id).get_summary(filter)

        return report_list_serializer.dump(data), http_response
