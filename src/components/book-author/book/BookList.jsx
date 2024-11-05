import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookList() {
  const baseUrl = "http://localhost:3000/books";
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [searchStack, setSearchStack] = useState("");

  function loadAllBooks() {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data);
        setFilteredBooks(data); // Initialize filteredBooks with allBooks
      })
      .catch(() => setMessage("Error loading books")); // Error handling for loading
  }

  useEffect(() => {
    loadAllBooks();
  }, []);

  useEffect(() => {
    const filtered = allBooks.filter((book) =>
      book.bookTitle.toLowerCase().includes(searchStack) // Assuming you want to filter by book title
    );
    setFilteredBooks(filtered);
  }, [searchStack, allBooks]);

  function handleView(id) {
    fetch(`${baseUrl}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        navigate("/book-author/book-view/" + id, { state: data });
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setMessage("Error fetching book details");
      });
  }

  function handleEdit(id) {
    navigate("/book-author/book-edit/" + id);
  }

  function handleDelete(id) {
    fetch(`${baseUrl}/${id}`, { method: "DELETE" })
      .then(() => {
        const updatedBooks = allBooks.filter(book => book.id !== id); // Correct the ID field here
        setAllBooks(updatedBooks);
        setFilteredBooks(updatedBooks);
        setMessage("Book successfully deleted");
      })
      .catch(() => setMessage("Cannot delete book"));
  }

  function handleSearch(event) {
    setSearchStack(event.target.value.toLowerCase());
  }

  return (
    <>
      {/* {JSON.stringify(allBooks)} */}
      <div className="container m-1">
        <h3>LIST OF BOOKS</h3>
        <input
          type="text"
          placeholder="Search by title"
          onChange={handleSearch}
        />
        {message && <div className="alert alert-info">{message}</div>}
        <table className="table table-striped my-2">
          <thead>
            <tr className="table-dark">
              <th>ID</th>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id}> 
                  <td>{book.id}</td> 
                  <td>{book.bookTitle}</td>
                  <td>
                    <button onClick={() => handleView(book.id)} className="btn btn-warning">View</button>
                    <button onClick={() => handleEdit(book.id)} className="btn btn-primary m-3">Edit</button>
                    <button onClick={() => handleDelete(book.id)} className="btn btn-danger m-1">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
