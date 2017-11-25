from .position import Position
from .MySQL.mySQL import MySQL
from .generator import Generator

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
    
    def login_with_token(self, phoneNumber, token, real_time_lat_location, real_time_long_location, status, direction=''):
        mysql = MySQL()
        try:
            list_of_results = mysql.query('SELECT token FROM gettaxi.account WHERE phone = %s', phoneNumber)
        except:
            mysql.close()
            return {'error' : 'error to check token from database'}

        try:
            user_token = list_of_results[0][0]
        except:
            return {'error' : 'no id or token in database'}
        
        if password == user_password:
            try:
                token = Generator().generate_token()
                mysql.update('UPDATE gettaxi.member SET token=%s WHERE phone=%s',(token,phoneNumber))
            except:
                mysql.close()
                return {'error' : 'cannot update token to database'}
            (phone, type, date_of_birth, facebook_id, email, address, firstname, lastname) = (mysql.query('SELECT * FROM gettaxi.member WHERE phone = %s', phoneNumber))[0]
            if type == 'driver':
                try:
                    mysql.insert('INSERT INTO gettaxi.subcriber_driver (phone, real_time_lat_location, real_time_long_location, direction, status) VALUES (%s, %s, %s, %s, %s)',(phoneNumber,real_time_lat_location,real_time_long_location,direction,status))
                except:
                    mysql.close()
                    return {'error' : 'cannot insert driver to data base maybe login twice'}
            elif type == 'user':
                try:
                    print(status)
                    mysql.insert('INSERT INTO gettaxi.subcriber_user (phone, real_time_lat_location, real_time_long_location, status) VALUES (%s, %s, %s, %s)',(phoneNumber,real_time_lat_location,real_time_long_location,status))
                except:
                    mysql.close()
                    return {'error' : 'cannot insert user to data base maybe login twice'}

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
            return {'error' : 'inValid id or password (login with token)'}

    def login(self, phoneNumber, password, real_time_lat_location, real_time_long_location, status, direction=''):
        mysql = MySQL()
        token = ''
        try:
            list_of_results = mysql.query('SELECT password FROM gettaxi.account WHERE phone = %s', phoneNumber)
        except:
            mysql.close()
            return {'error' : 'error to check password from database'}
        
        try:
            user_password = list_of_results[0][0]
        except:
            return {'error' : 'no id or password in database'}

        if password == user_password:
            try:
                token = Generator().generate_token()
                mysql.update('UPDATE gettaxi.account SET token=%s WHERE phone=%s',(token,phoneNumber))
            except:
                mysql.close()
                return {'error' : 'cannot update token to database'}
            (phone, type, date_of_birth, facebook_id, email, address, firstname, lastname) = (mysql.query('SELECT * FROM gettaxi.member WHERE phone = %s', phoneNumber))[0]
            if type == 'driver':
                try:
                    mysql.insert('INSERT INTO gettaxi.subcriber_driver (phone, real_time_lat_location, real_time_long_location, direction, status) VALUES (%s, %s, %s, %s, %s)',(phoneNumber,real_time_lat_location,real_time_long_location,direction,status))
                except:
                    mysql.close()
                    return {'error' : 'cannot insert driver to data base maybe login twice'}
            elif type == 'user':
                try:
                    print(status)
                    mysql.insert('INSERT INTO gettaxi.subcriber_user (phone, real_time_lat_location, real_time_long_location, status) VALUES (%s, %s, %s, %s)',(phoneNumber,real_time_lat_location,real_time_long_location,status))
                except:
                    mysql.close()
                    return {'error' : 'cannot insert user to data base maybe login twice'}

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
            return {'user' : user_profile,'token' : token}
        else:
            mysql.close()
            return {'error' : 'inValid id or password (user)'}

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
    
    def editProfile(self,phoneNumber,facebookID_edit='',password_edit='',dataOfBirth_edit='',firstName_edit='',lastName_edit='',address_edit=''):
        mysql = MySQL()
        if facebookID_edit != '':
            mysql.update('UPDATE gettaxi.member SET facebook_id=%s WHERE phone=%s',(facebookID_edit,phoneNumber))
        if password_edit != '':
            mysql.update('UPDATE gettaxi.member SET password=%s WHERE phone=%s',(password_edit,phoneNumber))
        if dataOfBirth_edit != '':
            mysql.update('UPDATE gettaxi.member SET date_of_birth=%s WHERE phone=%s',(dataOfBirth_edit,phoneNumber))
        if firstName_edit != '':
            mysql.update('UPDATE gettaxi.member SET firstname=%s WHERE phone=%s',(firstName_edit,phoneNumber))
        if lastName_edit != '':
            mysql.update('UPDATE gettaxi.member SET lastname=%s WHERE phone=%s',(lastName_edit,phoneNumber))
        if address_edit != '':
            mysql.update('UPDATE gettaxi.member SET address=%s WHERE phone=%s',(address_edit,phoneNumber))

        (phone, type, password, date_of_birth, facebook_id, email, address, firstname, lastname) = (mysql.query('SELECT * FROM gettaxi.member WHERE phone = %s', phoneNumber))[0]
        new_user_profile = {
            'facebookID': facebook_id,
            'phoneNumber': phone,
            'dataOfBirth': date_of_birth.strftime("%d-%m-%Y"),
            'firstName': firstname,
            'lastName': lastname,
            'address': address,
            'email': email,
            'type': type
        }

        mysql.close()
        return {'user' : new_user_profile}

    def deleteProfile(phoneNumber):
        mysql = MySQL()
        mysql.delete('DELETE FROM gettaxi.member WHERE phone = %s', (phoneNumber))
        mysql.close()
        return {'message' : 'user %s is deleted'.format(phoneNumber) }

    def sendRegEmail(self, email, password):
        return -1
