import { useState } from "react";
import api from "../api";

const BookActions = ({ book, setBooks }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [newRow, setNewRow] = useState(book.row);
  const [newShelf, setNewShelf] = useState(book.shelf);

  async function handleUpdate() {
    if (newRow && newShelf) {
      setIsUpdating(true);
      try {
        await api.put(
          `/books/${book.id}/${newRow}/${newShelf}`
        );
        setBooks((books) =>
          books.map((b) =>
            b.id === book.id ? { ...b, row: newRow, shelf: newShelf } : b
          )
        );
      } catch (error) {
        console.error("Error updating book:", error);
      } finally {
        setIsUpdating(false);
      }
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/books/${book.id}`);
      setBooks((books) => books.filter((b) => b.id !== book.id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  return (
    <div className="book-actions">
      <div className="update-form">
        <label htmlFor="row">Row:</label>
        <select
          id="row"
          value={newRow}
          onChange={(e) => setNewRow(e.target.value)}
          disabled={isUpdating}
        >
          <option value="" disabled>
            Row
          </option>
          {Array.from({ length: process.env.REACT_APP_MAX_ROWS }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <label htmlFor="shelf">Shelf:</label>
        <select
          id="shelf"
          value={newShelf}
          onChange={(e) => setNewShelf(e.target.value)}
          disabled={isUpdating}
        >
          <option value="" disabled>
            Shelf
          </option>
          {Array.from({ length: process.env.REACT_APP_MAX_SHELF }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <button
          className="btn btn-small"
          onClick={handleUpdate}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </div>
      <button className="btn btn-small btn-delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default BookActions;
