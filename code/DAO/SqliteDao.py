"""
This class is a singleton that handles the connection to the SQLite database.
It also contains methods to create and drop the database.
It will allow to change the state of a game.

Author: Christopher Perreault
Date: 2023-10-02
Version: 1.0
"""

import os
import sqlite3
from enum import Enum


class SqliteDao:
    _instance = None
    conn: sqlite3.Connection = None
    cursor: sqlite3.Cursor = None

    class ScriptType(Enum):
        CREATE = "create"
        DROP = "drop"

    def __new__(cls):
        # If an instance doesn't exist, create one; otherwise, return the existing instance
        if cls._instance is None:
            cls._instance = super(SqliteDao, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        self.path = (os.getcwd()[:os.getcwd().rfind("\\")] + "\\sqlite\\")
        self.name = "sqlite.db"
        self.pragma = "PRAGMA foreign_keys = ON;"

        self.__connect()

        if not os.path.exists(self.path):
            os.makedirs(self.path)
            self.__create_db()

        self.__close()

    def __create_db(self):
        for script in self.__get_scripts(self.ScriptType.CREATE):
            self.cursor.executescript(script)

    def __connect(self):
        self.conn = sqlite3.connect(self.path + self.name)
        self.conn.execute(self.pragma)
        self.conn.commit()
        self.cursor = self.conn.cursor()

    def __close(self):
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()

    def __get_scripts(self, script_type: ScriptType):
        scripts = []
        for file in os.listdir(self.path + script_type.value):
            with open(self.path + script_type.value + "\\" + file, "r") as f:
                scripts.append(f.read())
        return scripts

    def __drop_db(self):
        for script in self.__get_scripts(self.ScriptType.DROP):
            self.cursor.executescript(script)

    def debug_reset_db(self):
        self.__connect()
        self.__drop_db()
        self.__create_db()




if __name__ == "__main__":
    dao = SqliteDao()
    dao.debug_reset_db()

