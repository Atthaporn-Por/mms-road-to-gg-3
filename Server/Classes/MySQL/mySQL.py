import pymysql

class MySQL:

    def __init__(self,username='tara', password='t4101VIP', host='dbtaxivip.cf2040tucamf.ap-southeast-1.rds.amazonaws.com', port=3306, database='SE_taxiVIP'):
        self.username = username
        self.password = password
        self.host = host
        self.port = port
        self.database = database
        self.cnx = pymysql.connect(host=self.host, port=self.port, user=self.username, passwd=self.password, db=self.database)
        self.cursor = self.cnx.cursor()

    def query(self,querys,formats=()):
        return_list = []
        self.cursor.execute(querys,formats)
        for data in self.cursor:
            return_list.append(data)
        return return_list

    def insert(self,querys,data=(),dict_data={}):
        if data != ():
            self.cursor.execute(querys, data)
        elif dict_data != {}:
            self.cursor.execute(querys,dict_data)
        else:
            self.self.cursor.execute(querys)
        self.cnx.commit()

    def delete(self,querys,formats=()):
        self.cursor.execute(querys,formats)
        self.cnx.commit()

    def close(self):
        self.cursor.close()
        self.cnx.close()
