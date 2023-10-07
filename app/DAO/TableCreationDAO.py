from enum import Enum, auto

from app.DAO.abstractDAO.SqliteDAO import SqliteDAO


class TableCreationDao(SqliteDAO):
    class ScriptType(Enum):
        CREATE = auto()
        DROP = auto()
        ACTION = auto()

    def __init__(self):
        super().__init__()

    def create_tables(self):
        scripts = self.get_scripts(self.ScriptType.CREATE)
        for script in scripts:
            self.execute_script(script)

    def drop_tables(self):
        scripts = self.get_scripts(self.ScriptType.DROP)
        self.execute_scripts(scripts)

    def reset_db(self):
        self.connect()
        self.drop_tables()
        self.create_tables()

dao = TableCreationDao()
dao.reset_db()