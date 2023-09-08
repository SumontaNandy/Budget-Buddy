from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request

from ..utils.authorize import authorize
from ..utils.expect import expect

from ..schema.report import report_serializer

from ..service.report import *


api = Namespace('goal', description="User's goal related operations")

@api.route('/')
class Report(Resource):
    @jwt_required()
    def get(self):
        """
            get yearly report
        """
        user_id = get_jwt_identity()
        filter = request.args

        data, http_response = ReportUtil(user_id).get_summary(filter)

        return report_serializer.dump(data), http_response
