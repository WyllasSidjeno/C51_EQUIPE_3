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
from enum import auto, Enum


class SqliteDao:
    _instance = None
    __conn: sqlite3.Connection = None
    __cursor: sqlite3.Cursor = None

    class Actions(Enum):
        ADD_PLAYER = auto()
        """Name, Password"""
        GET_PLAYER = auto()
        """Name"""
        ADD_ITEM = auto()
        GET_ITEM = auto()

    class __ScriptType(Enum):
        CREATE = auto()
        DROP = auto()
        ACTION = auto()

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
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
        for script in self.__get_scripts(self.__ScriptType.CREATE):
            self.__cursor.executescript(script)

    def __drop_db(self):
        for script in self.__get_scripts(self.__ScriptType.DROP):
            self.__cursor.executescript(script)

    def __connect(self):
        self.__conn = sqlite3.connect(self.path + self.name)
        self.__conn.execute(self.pragma)
        self.__conn.commit()
        self.__cursor = self.__conn.cursor()

    def __close(self):
        if self.__cursor:
            self.__cursor.close()
        if self.__conn:
            self.__conn.close()

    def __get_scripts(self, script_type: Enum):
        scripts = []
        for file in os.listdir(self.path + script_type.name):
            with open(self.path + script_type.name + "\\" + file, "r") as f:
                scripts.append(f.read())
        return scripts

    def __get_action_script(self, action: Actions):
        scripts = self.__get_scripts(self.__ScriptType.ACTION)
        return next(script for script in scripts if action.name in script)

    def debug_reset_db(self):
        self.__connect()
        self.__drop_db()
        self.__create_db()

    def request(self, action: Actions, *args):
        self.__connect()
        try:
            script = self.__get_action_script(action)
            self.__cursor.execute(script, args)
            self.__conn.commit()
        except sqlite3.Error as e:
            print("An SQL error occurred:")
            print(e)
        except FileNotFoundError as e:
            print("A file error occurred:")
            print(e)
        except StopIteration as e:
            print(f'No such file exists : {action}')
            print(e)
        finally:
            self.__close()


sqli = SqliteDao()
sqli.debug_reset_db()
sqli.request(SqliteDao.Actions.ADD_PLAYER, "test", "test")
