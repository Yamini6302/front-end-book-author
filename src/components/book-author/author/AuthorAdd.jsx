import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthorAdd() {
  const navigate = useNavigate();
  const [authorData, setAuthorData] = useState({
    authorName: "",
    authorBio: "",
  });

  function handleFormChange(event) {
    setAuthorData({ ...authorData, [event.target.name]: event.target.value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3000/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorData),
    }).then(() => navigate("/authors"));
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
              <label htmlFor="authorBio" className="form-label">
                Author Bio:
              </label>
              <textarea
                id="authorBio"
                name="authorBio"
                className="form-control"
                required
                onChange={handleFormChange}
                value={authorData.authorBio}
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
