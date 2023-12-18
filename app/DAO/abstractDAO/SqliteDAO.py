import os
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

