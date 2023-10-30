import os
import sys
from DAO.TableCreationDAO import TableCreationDao
from DAO.CommentDAO import CommentDAO
from DAO.UserDAO import UserDAO

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

if __name__ == "__main__":
    TableCreationDao().reset_db()
