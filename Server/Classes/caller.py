from .user import User
from .MySQL.mySQL import MySQL

class Caller(User):

    def callTaxi(self, phoneNumber):
        mysql = MySQL()
        mysql.insert('UPDATE gettaxi.member SET status=calling WHERE phone=%s', phoneNumber)
        mysql.close()
        return {'message' : '%s calling sucessfully.'.format(phoneNumber)}

    def check_calling_status(self, phoneNumber):
        user_status = mysql.query('SELECT status FROM gettaxi.subcriber_user WHERE phone=%s',(phoneNumber))[0][0]
        if user_status == 'match':
            return {'message' : 'matching sucessfully'}
        else:
            mysql.close()
            return {'message' : 'try to match'}

    def searchTaxi(self, latitude , longitude):
        mysql = MySQL()
        min_latitude = latitude - 10.0
        max_latitude = latitude + 10.0
        min_longitude = longitude - 10.0
        max_longitude = longitude + 10.0
        list_of_results = mysql.query('SELECT * FROM gettaxi.subcriber_driver WHERE ((real_time_lat_location BETWEEN %s AND %s) AND (real_time_long_location BETWEEN %s AND %s) AND (status = "available"))', (min_latitude,max_latitude,min_longitude,max_longitude))
        list_of_taxi = []
        for result in list_of_results:
            (phone, real_time_lat_location, real_time_long_location, direction, status) = result
            real_time_lat_location = float("{0:.6f}".format(real_time_lat_location))
            real_time_long_location = float("{0:.6f}".format(real_time_long_location))
            direction = float("{0:.6f}".format(direction))
            driver_data = {
                'phone' : phone,
                'real_time_lat_location' : real_time_lat_location,
                'real_time_long_location' : real_time_long_location,
                'direction' : direction,
                'status' : status
            }
            list_of_taxi.append(driver_data)
        mysql.close()
        return {'driver' : list_of_taxi }

    def bookTaxi(self):
        print('booking')

    def paid(self, transactionID):
        print('paid')