import { useState } from "react";
import api from "../api";

const NewBookForm = ({ setBooks, setShowForm }) => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookEdition, setBookEdition] = useState("");
  const [bookRow, setBookRow] = useState("");
  const [bookShelf, setBookShelf] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      bookTitle.length <= 2 ||
      bookAuthor.length <= 2 ||
      bookEdition.length <= 2
    ) {
      alert("Title, Author, and Edition must be greater than 2 characters.");
      return;
    }
    if (!bookRow || !bookShelf) {
      alert("Please select a valid Row and Shelf.");
      return;
    }
    setIsUploading(true);
    try {
      const response = await api.post("/books/", {
        title: bookTitle,
        author: bookAuthor,
        edition: bookEdition,
        row: bookRow,
        shelf: bookShelf,
      });
      setIsUploading(false);
      setBooks((books) => [response.data["book"], ...books]);
      setBookTitle("");
      setBookAuthor("");
      setBookEdition("");
      setBookRow("");
      setBookShelf("");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  }

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        disabled={isUploading}
      />
      <input
        type="text"
        placeholder="Author"
        value={bookAuthor}
        onChange={(e) => setBookAuthor(e.target.value)}
        disabled={isUploading}
      />
      <input
        type="text"
        placeholder="Edition"
        value={bookEdition}
        onChange={(e) => setBookEdition(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={bookRow}
        onChange={(e) => setBookRow(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose row:</option>
        {Array.from({ length: 24 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <select
        value={bookShelf}
        onChange={(e) => setBookShelf(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose shelf:</option>
        {Array.from({ length: 9 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Add
      </button>
    </form>
  );
};

export default NewBookForm;
