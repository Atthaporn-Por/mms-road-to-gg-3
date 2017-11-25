from user import User 

class Driver:
    def __init__(isActive= '', status= '', location= '',licenseNO= '', drivePermissionID= '', SSN= ''):
        self.isActive = isActive
        self.status = status
        self.location = location
        self.licenseNO = licenseNO
        self.drivePermissionID = drivePermissionID
        self.SSN = SSN

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


    