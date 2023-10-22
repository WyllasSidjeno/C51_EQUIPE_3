from DAO.abstractDAO.SqliteDAO import SqliteDAO


class CommentDAO(SqliteDAO):
    def __init__(self):
        super().__init__()

    def add_comment(self, username, message):
        script = self.get_action_script("add_comment.sql")
        self.execute_script(script, message, username)

    def add_comment_comment(self, username, comment_id, message):
        script = self.get_action_script("add_comment_answer.sql")
        self.execute_script(script, comment_id, message, username)
