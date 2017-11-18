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
    if path_list[2] == 'login':
        print(querys_dict)
        try:
            return User().login(querys_dict['id'],querys_dict['password'])
        except:
            return {'error' : 'inValid id or password'}

def caller(path_list, querys_dict):
    if path_list[2] == 'searchtaxi':
        try:
            return Caller().searchTaxi(float(querys_dict['latitude']), float(querys_dict['longitude']))
        except:
            return {'error' : 'inValid Latitude and Longitude'}
    
    