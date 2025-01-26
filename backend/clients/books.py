from fastapi import HTTPException, Path
from models.books import Books
from schemas.book import Book


class BooksClient():

    @classmethod
    def get_books(cls, db):
        return db.query(Books).all()

    @classmethod
    def get_book_id(cls, db, book_id: int = Path(gt=0)):
        book_model = db.query(Books).filter(Books.id == book_id).first()
        if book_model is not None:
            return book_model
        raise HTTPException(status_code=404, detail='Book not found.')

    @classmethod
    def create_book(cls, db, book: Book):
        book_model = Books(**book.dict())
        db.add(book_model)
        db.commit()
        db.refresh(book_model)
        return {"book": book_model, "message": "Book created successfully."}

    @classmethod
    def update_book_lib_location(
        cls,
        db,
        book_id: int,
        row: int,
        shelf: int
    ):
        book_model = db.query(Books).filter(Books.id == book_id).first()
        if book_model is None:
            raise HTTPException(status_code=404, detail="Book not found.")
        book_model.row = row
        book_model.shelf = shelf
        db.add(book_model)
        db.commit()
        return {"message": "Book updated successfully."}

    @classmethod
    def delete_book(cls, db, book_id: int = Path(gt=0)):
        book_model = db.query(Books).filter(Books.id == book_id).first()
        if book_model is None:
            raise HTTPException(status_code=404, detail='Book not found.')
        db.delete(book_model)
        db.commit()
        return {"message": "Book deleted successfully."}