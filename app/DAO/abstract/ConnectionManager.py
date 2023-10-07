import os
import sqlite3


class ConnectionManager:
    def __init__(self):
        self.path = (os.getcwd()[:os.getcwd().rfind("\\")] + "\\sqlite\\")
        self.name = "sqlite.db"
        self.pragma = "PRAGMA foreign_keys = ON;"

        self.__conn = None

    def connect(self):
        if self.__conn is None:
            self.__conn = sqlite3.connect(self.path + self.name)
            self.__conn.execute(self.pragma)
            self.__conn.commit()

    def close(self):
        if self.__conn:
            self.__conn.close()
            self.__conn = None
