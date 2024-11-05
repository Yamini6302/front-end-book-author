import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BookEdit() {
  const { id } = useParams(); // Get the `id` parameter from the URL
  const navigate = useNavigate(); // Used to navigate after the update
  const [bookData, setBookData] = useState({
    bookTitle: "",
    bookPrice: "",
    authorId: 0,
  });
  const [message, setMessage] = useState("");

  // Fetch the current book details when the component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Book not found");
        return res.json();
      })
      .then((data) => {
        setBookData(data); // Set book data for the form
      })
      .catch((err) => {
        setMessage("Error: " + err.message);
      });
  }, [id]);

  // Handle input changes
  function handleFormChange(event) {
    const { name, value } = event.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Handle form submission to update the book data
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    fetch(`http://localhost:3000/books/${id}`, {
      method: "PUT", // Use the PUT method to update the data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData), // Send updated book data as JSON
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update book");
        return res.json();
      })
      .then(() => {
        navigate("/book-author/books-list"); // Navigate to the book list after success
      })
      .catch((err) => {
        setMessage("Error: " + err.message);
      });
  }

  return (
    <div className="container m-5">
      <h3>Edit Book</h3>
      {message && <div className="alert alert-danger">{message}</div>}

      <div className="card shadow-sm p-4">
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="bookTitle" className="form-label">
                Book Title
              </label>
              <input
                type="text"
                id="bookTitle"
                name="bookTitle"
                className="form-control"
                value={bookData.bookTitle}
                required
                onChange={handleFormChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bookPrice" className="form-label">
                Book Price
              </label>
              <input
                type="text"
                id="bookPrice"
                name="bookPrice"
                className="form-control"
                value={bookData.bookPrice}
                required
                onChange={handleFormChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="authorId" className="form-label">
                Author ID
              </label>
              <input
                type="number"
                id="authorId"
                name="authorId"
                className="form-control"
                value={bookData.authorId}
                required
                onChange={handleFormChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
