import os
import sys
from DAO.TableCreationDAO import TableCreationDao
from DAO.CommentDAO import CommentDAO
from DAO.UserDAO import UserDAO

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

if __name__ == "__main__":
    comment = CommentDAO()
    print(comment.get_comments())

    user = UserDAO()
    print(user.get_user_with_password("admin"))