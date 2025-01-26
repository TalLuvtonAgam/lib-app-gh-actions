import BookActions from "./BookActions";
import BookDetails from "./BookDetails";

const Book = ({ book, setBooks }) => {
  return (
    <li className="book">
      <BookDetails book={book} />
      <BookActions book={book} setBooks={setBooks} />
    </li>
  );
};

export default Book;
