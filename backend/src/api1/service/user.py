from ..model.user import User
from http import HTTPStatus

class UserUtil:
    def __init__(self, id):
        self.id = id

    def extract_user_data(self, data):
        dict = {}

        if data.get('email') is not None:
            data.pop('email')
        if data.get('password') is not None:
            data.pop('password')

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

    def get_info(self):
        data = User.get_by_id(self.id).toDict()

        data.pop('password')

        return data, HTTPStatus.OK
    
    def update_img(self, img):
        user = User.get_by_id(self.id)

        setattr(user, 'img', img)
        user.save()

    def update_info(self, data):
        data = self.extract_user_data(data)     
        
        if data.get('img') is not None:
            data.pop('img')

        new_user = User.get_by_id(self.id)
        for key in data.keys():
            setattr(new_user, key, data[key])

        new_user.save()

        return self.get_info()