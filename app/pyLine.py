import os,sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from DAO.TableCreationDAO import TableCreationDao


if __name__ == "__main__":
    
    dao = TableCreationDao()
    dao.create_tables()