import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthorAdd() {
  const navigate = useNavigate();
  const [authorData, setAuthorData] = useState({
    authorName: "",
    biography: "",
  });

  // Handle form input changes
  function handleFormChange(event) {
    setAuthorData({ ...authorData, [event.target.name]: event.target.value });
  }

  // Handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();

    // Submit the form to the backend API
    fetch("http://localhost:3000/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorData), // Send the author data without `id`
    })
      .then(() => navigate("/book-author/author-list")) // Redirect to authors list after adding
      .catch((error) => console.error("Error adding author:", error));
  }

  return (
    <div className="container m-5">
      <div className="card shadow-lg p-4">
        <div className="card-header bg-primary text-white text-center">
          <h3>Add a New Author</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="authorName" className="form-label">
                Author Name:
              </label>
              <input
                type="text"
                id="authorName"
                name="authorName"
                className="form-control"
                required
                onChange={handleFormChange}
                value={authorData.authorName}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="biography" className="form-label">
                Author Biography:
              </label>
              <textarea
                id="biography"
                name="biography"
                className="form-control"
                required
                onChange={handleFormChange}
                value={authorData.biography}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Add Author
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
