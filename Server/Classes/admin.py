from .MySQL.mySQL import MySQL

class Admin:

    def __init__(self, name='godsnuts'):
        self.name = name

    def createUserProfile(self,phoneNumber,type='',dataOfBirth='',facebookID='',email='',address='',firstName='',lastName=''):
        mysql = MySQL()
        mysql.insert('INSERT INTO gettaxi.member (phone, type, date_of_birth, facebook_id, email, address, firstname, lastname) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (phoneNumber,type,dataOfBirth,facebookID, email,address,firstName,lastName))
        (phone, type, date_of_birth, facebook_id, email, address, firstname, lastname) = (mysql.query('SELECT * FROM gettaxi.member WHERE phone = %s', phoneNumber))[0]
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

    def deleteUserProfile(self, phoneNumber):
        mysql = MySQL()
        mysql.delete('DELETE FROM gettaxi.member WHERE phone = %s', (phoneNumber))
        mysql.close()
        return {'message' : 'user %s is deleted'.format(phoneNumber) }

    def updateUserProfile(self):

    def query(self):

    def readReport(self):
