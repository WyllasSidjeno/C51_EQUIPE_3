from app.DAO.abstract.SqliteDao import SqliteDao


class TableCreationDao(SqliteDao):
    def __init__(self):
        super().__init__()

    def create_tables(self):
        scripts = self.get_scripts(self.ScriptType.CREATE)
        for script in scripts:
            self.execute_script(script)

    def drop_tables(self):
        scripts = self.get_scripts(self.ScriptType.DROP)
        for script in scripts:
            self.execute_script(script)

    def debug_reset_db(self):
        self.connect()
        self.drop_tables()
        self.create_tables()