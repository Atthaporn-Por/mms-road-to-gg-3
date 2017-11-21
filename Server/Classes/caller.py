from .user import User
from .MySQL.mySQL import MySQL

class Caller(User):

    def callTaxi(self):
        mysql = MySQL()
        mysql.close()
        print('call taxi!!')

    def searchTaxi(self, latitude , longitude):
        mysql = MySQL()
        min_latitude = latitude - 10.0
        max_latitude = latitude + 10.0
        min_longitude = longitude - 10.0
        max_longitude = longitude + 10.0
        list_of_results = mysql.query('SELECT * FROM gettaxi.subcriber_driver WHERE ((real_time_lat_location BETWEEN %s AND %s) AND (real_time_long_location BETWEEN %s AND %s) AND (status = "available"))', (min_latitude,max_latitude,min_longitude,max_longitude))
        print('done')
        print(list_of_results)
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