import React, { useState, useEffect } from "react";
import api from "./api";
import "./App.css";
import Header from "./components/Header";
import BooksList from "./components/BooksList";
import NewBookForm from "./components/NewBookForm";
import Loader from "./components/Loader";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getBooks() {
      setIsLoading(true);
      try {
        const response = await api.get("/books/");
        setBooks(response.data);
      } catch (error) {
        alert("There was a problem getting data");
      } finally {
        setIsLoading(false);
      }
    }
    getBooks();
  }, []);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? (
        <NewBookForm setBooks={setBooks} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        {isLoading ? (
          <Loader />
        ) : (
          <BooksList books={books} setBooks={setBooks} />
        )}
      </main>
    </>
  );
};

export default App;
