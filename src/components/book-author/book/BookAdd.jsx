import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BookAdd() {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    bookTitle: "",
    bookPrice: "",
    authorId: "",
  });
  const [authors, setAuthors] = useState([]);

  // Fetch the list of authors for the dropdown
  useEffect(() => {
    fetch("http://localhost:3000/authors")
      .then((response) => response.json())
      .then((data) => setAuthors(data))
      .catch((error) => console.error("Error fetching authors:", error));
  }, []);

  // Handle form input changes
  function handleFormChange(event) {
    setBookData({ ...bookData, [event.target.name]: event.target.value });
  }

  // Handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    // Do not include `id` in the request; let the server handle it
    fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData), // No `id` field here
    }).then(() => navigate("/book-author/books-list"));
  }

  return (
    <div className="container m-5">
      <div className="card shadow-lg p-4">
        <div className="card-header bg-primary text-white text-center">
          <h3>Add a New Book</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="bookTitle" className="form-label">
                Book Title:
              </label>
              <input
                type="text"
                id="bookTitle"
                name="bookTitle"
                className="form-control"
                required
                onChange={handleFormChange}
                value={bookData.bookTitle}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bookPrice" className="form-label">
                Book Price:
              </label>
              <input
                type="text"
                id="bookPrice"
                name="bookPrice"
                className="form-control"
                required
                onChange={handleFormChange}
                value={bookData.bookPrice}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="authorId" className="form-label">
                Author:
              </label>
              <select
                id="authorId"
                name="authorId"
                className="form-select"
                required
                onChange={handleFormChange}
                value={bookData.authorId}
              >
                <option value="">Select an Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.authorName}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
