from DAO.abstractDAO.SqliteDAO import SqliteDAO


class CommentDAO(SqliteDAO):
    def __init__(self):
        super().__init__()

    def add_comment(self, username, message):
        print("add_comment")
        script = self.get_action_script("add_comment.sql")
        self.execute_script(script, message, username)

    def add_comment_comment(self, username, comment_id, message):
        script = self.get_action_script("add_comment_answer.sql")
        return self.execute_script(script, comment_id, message, username)

    def get_comments(self):
        print("get_comments")
        script = self.get_action_script("get_comments.sql")
        return self.execute_script(script)
