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
        script = []
        args = []
        script.append(
            self.get_action_script(self.ActionType.ADD_USER.name+".sql")
        )
        args.append((user,)) # HAS TO BE A TUPLE AT ALL TIMES
        script.append(
            self.get_action_script(self.ActionType.ADD_PASSWORD.name+".sql")
        )
        args.append((password, salt))

        self.execute_scripts(script, args)

    def get_user_with_password(self, user):
        script = self.get_action_script(self.ActionType.GET_USER.name+".sql")
        return self.execute_script(script, user)
