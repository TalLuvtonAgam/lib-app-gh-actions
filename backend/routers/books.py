from typing import Annotated, List
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Path
from starlette import status
from database import SessionLocal
from schemas.book import Book
from clients.books import BooksClient
import os

MAX_ROW_NUMBER = int(os.getenv("MAX_ROW_NUMBER", 25)) 
MAX_SHELF_NUMBER = int(os.getenv("MAX_SHELF_NUMBER", 10)) 

router = APIRouter(prefix="/books", tags=["Books"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=List[Book], status_code=status.HTTP_200_OK)
async def get_books(db: db_dependency):
    return BooksClient.get_books(db)


@router.get("/{book_id}", status_code=status.HTTP_200_OK)
async def get_book_id(db: db_dependency, book_id: int = Path(gt=0)):
    return BooksClient.get_book_id(db, book_id)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_book(db: db_dependency, book: Book):
    return BooksClient.create_book(db, book)


@router.put("/{book_id}/{row}/{shelf}", status_code=status.HTTP_200_OK)
async def update_book_lib_location(
    db: db_dependency,
    book_id: int = Path(gt=0),
    row: int = Path(gt=0, lt=MAX_ROW_NUMBER),
    shelf: int = Path(gt=0, lt=MAX_SHELF_NUMBER)
):
    return BooksClient.update_book_lib_location(db, book_id, row, shelf)


@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_book(db: db_dependency, book_id: int = Path(gt=0)):
    return BooksClient.delete_book(db, book_id)
