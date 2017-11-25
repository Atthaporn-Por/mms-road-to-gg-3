class PaymentCtrl:

    def PaymentCtrl(self):
        #mysql = MySQL()
        #mysql.close()
        print('payment')

    def sendPaymentinfo(self,transactionID):
        #print('sentPayment')
        self.transactionID = transactionID

    def collectTransaction(self):
        print('collectTransaction')


    def getAmountfromTran(self,distance):
        fair = 35
        dis = distance

        while (dis >= 1):
            if dis >= 80 :
                x = dis - 80
                fair += x*10.5
                dis = dis - x
            elif 60 <= dis < 80:
                x = dis - 60
                fair += x*9
                dis = dis -60
            elif 40 <= dis < 60 :
                x = dis - 40
                fair += x * 8
                dis = dis - 40
            elif 20 <= dis < 40 :
                x = dis - 20
                fair += x * 7.5
                dis = dis - 20
            elif 10 <= dis < 20 :
                x = dis - 10
                fair += x * 6.5
                dis = dis - 10
            elif 1 <= dis < 10 :
                fair += dis * 5.5
                dis = 0

        return  fair


