from user import User 

class Driver:
    def __init__(isActive= '', status= '', location= '',licenseNO= '', drivePermissionID= '', SSN= ''):
        self.isActive = isActive
        self.status = status
        self.location = location
        self.licenseNO = licenseNO
        self.drivePermissionID = drivePermissionID
        self.SSN = SSN

    def searchUser(self, latitude , longitude):
        mysql = MySQL()
        min_latitude = latitude - 10.0
        max_latitude = latitude + 10.0
        min_longitude = longitude - 10.0
        max_longitude = longitude + 10.0
        list_of_results = mysql.query('SELECT * FROM gettaxi.subcriber_user WHERE ((real_time_lat_location BETWEEN %s AND %s) AND (real_time_long_location BETWEEN %s AND %s) AND (status = "calling"))', (min_latitude,max_latitude,min_longitude,max_longitude))
        list_of_user = []
        for result in list_of_results:
            (phone, real_time_lat_location, real_time_long_location, status) = result
            real_time_lat_location = float("{0:.6f}".format(real_time_lat_location))
            real_time_long_location = float("{0:.6f}".format(real_time_long_location))
            user_data = {
                'phone' : phone,
                'real_time_lat_location' : real_time_lat_location,
                'real_time_long_location' : real_time_long_location,
                'status' : status
            }
            list_of_user.append(user_data)
        mysql.close()
        return {'driver' : list_of_user }


    def accept(self, transactionID):
        # return int
        self.status = 'accept'
        self.isActive = 0

    
    def pickup(self):
        # void
        self.status = 'pickup'

    def dropOff(self):
        # void
        self.status = 'dropoff'
        self.isActive = 1


    def chat(self):
        # void

    def readReview():
        # void


    