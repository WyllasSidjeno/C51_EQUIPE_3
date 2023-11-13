from enum import Enum, auto

from DAO.abstractDAO.SqliteDAO import SqliteDAO


class TableCreationDao(SqliteDAO):
    def __init__(self):
        super().__init__()

    def create_tables(self):
        scripts = self.get_scripts(self._ScriptType.CREATE)
        for script in scripts:
            for s in script.split(";"):
                self.execute_script(s)

    def reset_db(self):
        self.connect()
        self.create_tables()

