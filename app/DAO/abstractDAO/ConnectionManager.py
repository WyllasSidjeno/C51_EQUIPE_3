import os
import sqlite3


class ConnectionManager:
    def __init__(self):
        self.path = (os.getcwd()[:os.getcwd().rfind("\\")] + "\\sqlite\\")
        self.name = "sqlite.db"
        self.pragma = "PRAGMA foreign_keys = ON;"

        self._conn = None

    def connect(self):
        if self._conn is None:
            self._conn = sqlite3.connect(self.path + self.name)
            self._conn.execute(self.pragma)
            self._conn.commit()

    def close(self):
        if self._conn:
            self._conn.close()
            self._conn = None
