import os
import sqlite3
from enum import auto, Enum

from DAO.abstractDAO.ConnectionManager import ConnectionManager


class SqliteDAO(ConnectionManager):
    class _ScriptType(Enum):
        CREATE = auto()
        DROP = auto()
        ACTION = auto()


    def __init__(self):
        super().__init__()
        if not os.path.exists(self.path):
            os.makedirs(self.path)

    def execute_script(self, script: str, *args):
        result = None
        self.connect()
        try:
            cursor = self._conn.cursor()
            if args:
                cursor.execute(script, args)
            else:
                print(script)
                cursor.executescript(script)
            result = cursor.fetchone()
            self._conn.commit()
        except sqlite3.Error as e:
            print("An SQL error occurred:")
            print(e)
        finally:
            self.close()
        return dict(zip(result.keys(), result)) if result else None

    def execute_scripts(self, scripts: list[str], arguments: list[tuple] = None):
        self.connect()
        results = []
        try:
            cursor = self._conn.cursor()
            for i, script in enumerate(scripts):
                if arguments and i < len(arguments):
                    cursor.execute(script, arguments[i])
                else:
                    print(script)
                    cursor.executescript(script)
                value = cursor.fetchone()
                if value:
                    results.append(dict(zip(value.keys(), value)))
            self._conn.commit()
        except sqlite3.Error as e:
            print("An SQL error occurred:")
            print(e)
        finally:
            self.close()
        return results

    def get_scripts(self, script_type):
        scripts = []
        for file in os.listdir(self.path + script_type.name):
            with open(os.path.join(self.path, script_type.name, file), "r") as f:
                scripts.append(f.read())
        return scripts

    def get_script(self, script_type, script_name):
        with open(os.path.join(self.path, script_type.name, script_name), "r") as f:
            return f.read()

    def get_action_script(self, script_name):
        return self.get_script(self._ScriptType.ACTION, script_name)
