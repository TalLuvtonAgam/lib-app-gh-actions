const BookDetails = ({ book }) => {
  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Edition: {book.edition}</p>
      <p>
        Location: Row {book.row}, Shelf {book.shelf}
      </p>
    </div>
  );
};

export default BookDetails;
