import Book from "./Book";

const BooksList = ({ books, setBooks }) => {
  if (books.length === 0)
    return (
      <p className="message">
        No books in the library yet! Create the first one ✌️
      </p>
    );

  return (
    <section>
      <ul className="books-list">
        {books.map((book) => (
          <Book key={book.id} book={book} setBooks={setBooks} />
        ))}
      </ul>
      <p>There are {books.length} books in the library. Add another one!</p>
    </section>
  );
};

export default BooksList;
