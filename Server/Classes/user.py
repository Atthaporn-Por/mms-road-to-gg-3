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

    def login(self, phoneNumber, password):
        mysql = MySQL()
        list_of_results = mysql.query('SELECT password FROM gettaxi.member WHERE phone = %s', phoneNumber)
        print(list_of_results)
        if password == list_of_results[0][0]:
            (phone, password, date_of_birth, facebook_id, email, address, firstname, lastname) = (mysql.query('SELECT * FROM gettaxi.member WHERE phone = %s', phoneNumber))[0]
            mysql.close()
            user_profile = {
                'facebookID': facebook_id,
                'phoneNumber': phone,
                'password': password,
                'dataOfBirth': date_of_birth.strftime("%d-%m-%Y"),
                'firstName': firstname,
                'lastName': lastname,
                'address': address,
                'email': email
            }
            return {'user' : user_profile}
        else:
            return {'error' : 'inValid id or password'}

    def logout(self):
        print('logout')
        return "000nut..."
    
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
