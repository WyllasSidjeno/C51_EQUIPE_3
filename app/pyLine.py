import os
import sys
from DAO.TableCreationDAO import TableCreationDao

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

if __name__ == "__main__":
    TableCreationDao().create_tables()