import os
import sqlite3

from app.DAO.abstractDAO.ConnectionManager import ConnectionManager


class SqliteDAO(ConnectionManager):
    def __init__(self):
        super().__init__()
        if not os.path.exists(self.path):
            os.makedirs(self.path)

    def execute_script(self, script: str, *args):
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

    def execute_scripts(self, scripts: list[str], args: list[tuple] = None):
        self.connect()
        try:
            cursor = self._conn.cursor()
            for i, script in enumerate(scripts):
                if args and i < len(args):
                    cursor.executescript(script, args[i])
                else:
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

    def get_script(self, script_type, script_name):
        with open(os.path.join(self.path, script_type.name, script_name), "r") as f:
            return f.read()
