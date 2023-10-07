import os
import sqlite3

from app.DAO.abstractDAO.ConnectionManager import ConnectionManager


class SqliteDao(ConnectionManager):
    def __init__(self):
        super().__init__()
        if not os.path.exists(self.path):
            os.makedirs(self.path)

    def execute_script(self, script: str):
        self.connect()
        try:
            cursor = self._conn.cursor()
            cursor.executescript(script)
            self._conn.commit()
        except sqlite3.Error as e:
            print("An SQL error occurred:")
            print(e)
        finally:
            self.close()

    def execute_scripts(self, scripts: list[str]):
        self.connect()
        try:
            cursor = self._conn.cursor()
            for script in scripts:
                cursor.executescript(script)
            self._conn.commit()
        except sqlite3.Error as e:
            print("An SQL error occurred:")
            print(e)
        finally:
            self.close()

    def get_scripts(self, script_type):
        scripts = []
        for file in os.listdir(self.path + script_type.name):
            with open(os.path.join(self.path, script_type.name, file), "r") as f:
                scripts.append(f.read())
        return scripts
