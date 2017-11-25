from Classes.caller import Caller
from Classes.user import User

def path_spliter(path):
    return path.split('/')

def query_spliter(querys):
    if querys == '':
        return {}
    querys_dict = {}
    querys_list = querys.split('&')
    for query in querys_list:
        temp = query.split('=')
        querys_dict[temp[0]] = temp[1]
    return querys_dict

def url_management(path, querys):
    path_list = path_spliter(path)
    querys_dict = query_spliter(querys)
    if path_list[1] == 'user':
        return user(path_list, querys_dict)
    elif path_list[1] == 'caller':
        return caller(path_list, querys_dict)
    else: 
        return {'error' : 'invalid address'}

def user(path_list, querys_dict):
    if path_list[2] == 'loginWithToken':
        try:
            user_id = querys_dict['id']
            token = querys_dict['token']
            latitude = querys_dict['latitude']
            longitude = querys_dict['longitude']
            status = querys_dict['status']
            direction = querys_dict['direction']
        except:
            return {'error' : 'inValid syntax id or token'}
        if 'direction' in querys_dict:
            return User().login_with_token(user_id,token,latitude,longitude,status,direction)
        else:
            return User().login_with_token(user_id,token,latitude,longitude,status)

    elif path_list[2] == 'login':
        try:
            user_id = querys_dict['id']
            password = querys_dict['password']
            latitude = querys_dict['latitude']
            longitude = querys_dict['longitude']
            status = querys_dict['status']
            direction = querys_dict['direction']
        except:
            return {'error' : 'inValid syntax id or password'}
        if 'direction' in querys_dict:
            return User().login(user_id,password,latitude,longitude,status,direction)
        else:
            return User().login(user_id,password,latitude,longitude,status)
    elif path_list[2] == 'logout':
        try:
            return User().logout(querys_dict['id'])
        except Error as error:
            print(error)
            return {'error' : 'inValid syntax id'}
    elif path_list[2] == 'editprofile':
        print('do edit')
        try:
            facebookID_edit=''
            password_edit=''
            dataOfBirth_edit=''
            firstName_edit=''
            lastName_edit=''
            address_edit=''

            if 'facebookID' in querys_dict:
                facebookID_edit = querys_dict['facebookID']
            if 'password' in querys_dict:
                password_edit = querys_dict['password']
            if 'dataOfBirth' in querys_dict:
                dataOfBirth_edit = querys_dict['dataOfBirth']
            if 'firstName' in querys_dict:
                firstName_edit = querys_dict['firstName']
            if 'lastName' in querys_dict:
                lastName_edit = querys_dict['lastName']
            if 'address' in querys_dict:
                address_edit = querys_dict['address']
            return User().editProfile(querys_dict['id'],facebookID_edit,password_edit,dataOfBirth_edit,firstName_edit,lastName_edit,address_edit)
        except Error as error:
            print(error)
            return {'error' : 'inValid syntax id'}


def caller(path_list, querys_dict):
    if path_list[2] == 'searchtaxi':
        try:
            return Caller().searchTaxi(float(querys_dict['latitude']), float(querys_dict['longitude']))
        except:
            return {'error' : 'inValid syntax Latitude and Longitude'}
    
    