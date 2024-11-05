import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BookEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    bookTitle: "",
    bookPrice: "",
    authorId: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBookData(data));
  }, [id]);

  function handleFormChange(event) {
    setBookData({ ...bookData, [event.target.name]: event.target.value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    }).then(() => navigate("/books"));
  }

  return (
    <div className="container m-5">
      <h3>EDIT BOOK</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Book Title:</label>
          <input
            type="text"
            name="bookTitle"
            value={bookData.bookTitle}
            required
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>Book Price:</label>
          <input
            type="text"
            name="bookPrice"
            value={bookData.bookPrice}
            required
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>Author ID:</label>
          <input
            type="number"
            name="authorId"
            value={bookData.authorId}
            required
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">UPDATE</button>
      </form>
    </div>
  );
}
