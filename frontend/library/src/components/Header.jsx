const Header = ({ showForm, setShowForm }) => {
  const appTitle = "Library";
  return (
    <header className="header">
      <div className="title">
        <img src="book_logo.png" height="68" width="68" alt="Book Logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Add a book"}
      </button>
    </header>
  );
};

export default Header;
