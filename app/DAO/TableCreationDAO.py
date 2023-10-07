from enum import Enum, auto

from app.DAO.abstractDAO.SqliteDAO import SqliteDAO


class TableCreationDao(SqliteDAO):

    def __init__(self):
        super().__init__()

    def create_tables(self):
        scripts = self.get_scripts(self._ScriptType.CREATE)
        for script in scripts:
            self.execute_script(script)

    def drop_tables(self):
        scripts = self.get_scripts(self._ScriptType.DROP)
        self.execute_scripts(scripts)

    def reset_db(self):
        self.connect()
        self.drop_tables()
        self.create_tables()

dao = TableCreationDao()
dao.drop_tables()
dao.create_tables()