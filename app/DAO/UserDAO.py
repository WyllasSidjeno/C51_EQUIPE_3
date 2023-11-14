import sqlite3
from enum import Enum, auto

from DAO.abstractDAO.SqliteDAO import SqliteDAO


class UserDAO(SqliteDAO):
    class ActionType(Enum):
        ADD_USER = auto()
        ADD_PASSWORD = auto()
        GET_USER = auto()

    def __init__(self):
        super().__init__()

    def add_user(self, user, password, salt):
        user_script = (
            self.get_action_script(self.ActionType.ADD_USER.name+".sql")
        )
        password_script = (
            self.get_action_script(self.ActionType.ADD_PASSWORD.name+".sql")
        )
        try:
            self.connect()
            cursor = self._conn.cursor()

            cursor.execute(user_script, (user,))

            cursor.execute(password_script, (password, salt))

            self._conn.commit()
        except sqlite3.Error as e:
            raise e


    def get_user_with_password(self, user):
        script = self.get_action_script(self.ActionType.GET_USER.name+".sql")
        self.connect()
        try:
            cursor = self._conn.cursor()
            cursor.execute(script, (user,))
            result = cursor.fetchone()
            if result is None:
                return None
            else:
                return dict(zip([key[0] for key in cursor.description], result))
        except sqlite3.Error as e:
            raise e
        finally:
            self.close()