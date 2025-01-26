from pydantic import BaseModel, Field
from typing import Union
import os 

MAX_ROW_NUMBER = int(os.getenv("MAX_ROW_NUMBER", 25)) 
MAX_SHELF_NUMBER = int(os.getenv("MAX_SHELF_NUMBER", 10)) 

class Book(BaseModel):
    id: Union[int, None] = None
    title: str = Field(min_length=2)
    author: str = Field(min_length=3, max_length=50)
    edition: str = Field(min_length=2)
    row: int = Field(gt=0, lt=MAX_ROW_NUMBER)
    shelf: int = Field(gt=0, lt=MAX_SHELF_NUMBER)

    class Config:
        orm_mode = True