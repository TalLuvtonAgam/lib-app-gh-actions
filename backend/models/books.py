from database import Base
from sqlalchemy import Column, Integer, String

class Books(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)  
    author = Column(String, nullable=False)  
    edition = Column(String, nullable=False)  
    row = Column(Integer, nullable=False)  
    shelf = Column(Integer, nullable=False)