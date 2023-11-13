from DAO.abstractDAO.SqliteDAO import SqliteDAO
import sqlite3

class CommentDAO(SqliteDAO):
    def __init__(self):
        super().__init__()

    def add_comment(self, username, message):
        script = self.get_action_script("add_comment.sql")
        try:
            self.connect()
            cursor = self._conn.cursor()
            cursor.execute(script, (message, username))
            self._conn.commit()
        except sqlite3.Error as e:
            print("add_comment error")
            raise e
        finally:
            self.close()

    def get_comments(self):
        print("get_comments")
        script = self.get_action_script("get_comments.sql")
        try:
            self.connect()
            cursor = self._conn.cursor()
            cursor.execute(script)
            result = cursor.fetchall()
            result = [dict(zip([key[0] for key in cursor.description], row)) for row in result]
            return result
        except sqlite3.Error as e:
            raise e
        finally:
            self.close()
