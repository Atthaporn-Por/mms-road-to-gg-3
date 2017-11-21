from .position import Position
from .MySQL.mySQL import MySQL

class User:
  
    def __init__(self, facebookID= '', phoneNumber= '', password = '', dataOfBirth= '', firstName = '', lastName= '', address= ''):
        self.facebookID = facebookID
        self.phoneNumber = phoneNumber
        self.password = password
        self.dataOfBirth = dataOfBirth
        self.firstName = firstName
        self.lastName = lastName
        self.address = address
        self.user_position = Position()

    def login(self, phoneNumber, password, real_time_lat_location, real_time_long_location, status, direction=''):
        mysql = MySQL()
        try:
            list_of_results = mysql.query('SELECT password FROM gettaxi.member WHERE phone = %s', phoneNumber)
        except Error as error:
            mysql.close()
            return {'error' : error}
        (user_password,) = list_of_results[0]

        if password == user_password:
            (phone, type, password, date_of_birth, facebook_id, email, address, firstname, lastname) = (mysql.query('SELECT * FROM gettaxi.member WHERE phone = %s', phoneNumber))[0]
            if type == 'driver':
                try:
                    mysql.insert('INSERT INTO gettaxi.subcriber_driver (phone, real_time_lat_location, real_time_long_location, direction, status) VALUES (%s, %s, %s, %s, %s)',(phoneNumber,real_time_lat_location,real_time_long_location,direction,status))
                except Error as error:
                    mysql.close()
                    return {'error' : error}
            elif type == 'user':
                try:
                    print(status)
                    mysql.insert('INSERT INTO gettaxi.subcriber_user (phone, real_time_lat_location, real_time_long_location, status) VALUES (%s, %s, %s, %s)',(phoneNumber,real_time_lat_location,real_time_long_location,status))
                except Error as error:
                    mysql.close()
                    return {'error' : error}

            user_profile = {
                'facebookID': facebook_id,
                'phoneNumber': phone,
                'type': type,
                'dataOfBirth': date_of_birth.strftime("%d-%m-%Y"),
                'firstName': firstname,
                'lastName': lastname,
                'address': address,
                'email': email
            }
            mysql.close()
            return {'user' : user_profile}
        else:
            mysql.close()
            return {'error' : 'inValid id or password'}

    def logout(self, phoneNumber):
        mysql = MySQL()
        querys = ''
        type = mysql.query('SELECT type FROM gettaxi.member WHERE phone = %s', phoneNumber)
        type = type[0][0]
        if type == 'driver':
            querys = 'DELETE FROM gettaxi.subcriber_driver WHERE phone = %s'
        elif type == 'user':
            querys = 'DELETE FROM gettaxi.subcriber_user WHERE phone = %s'
        try:
            mysql.delete(querys, phoneNumber)
        except Error as error:
            mysql.close()
            return {'error' : error}
        mysql.close()
        return {'message' : 'logout sucessfully.'}
    
    def editProfile(self, user):
        self.facebookID = user.facebookID
        self.phoneNumber = user.phoneNumber
        self.password = user.password
        self.dataOfBirth = user.dataOfBirth
        self.firstName = user.firstName
        self.lastName = user.lastName
        self.address = user.address

        new_user_profile = {
            'facebookID': self.facebookID,
            'phoneNumber': self.phoneNumber,
            'dataOfBirth': self.dataOfBirth,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'address': self.address
        }

        return {'user' : new_user_profile}

    def sendRegEmail(self, email, password):
        return -1
