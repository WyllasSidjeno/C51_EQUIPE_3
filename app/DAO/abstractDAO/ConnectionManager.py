import os
import sqlite3
import sys


class ConnectionManager:
    def __init__(self):
        self.path = (os.path.dirname(os.path.abspath(sys.argv[0])) + "\\sqlite\\")
        self.name = "sqlite.db"
        self.pragma = "PRAGMA foreign_keys = ON;"

        self._conn = None

    def connect(self):
        if self._conn is None:
            self._conn = sqlite3.connect(self.path + self.name)
            self._conn.execute(self.pragma)
            self._conn.row_factory = sqlite3.Row
            self._conn.commit()

    def close(self):
        if self._conn:
            self._conn.close()
            self._conn = None

