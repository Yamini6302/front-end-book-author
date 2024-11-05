import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AuthorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [authorData, setAuthorData] = useState({
    authorName: "",
    authorBio: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/authors/${id}`)
      .then((res) => res.json())
      .then((data) => setAuthorData(data));
  }, [id]);

  function handleFormChange(event) {
    setAuthorData({ ...authorData, [event.target.name]: event.target.value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/authors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorData),
    }).then(() => navigate("/authors"));
  }

  return (
    <div className="container m-5">
      <h3>Edit Author</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Author Name:</label>
          <input
            type="text"
            name="authorName"
            value={authorData.authorName}
            required
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>Author Bio:</label>
          <textarea
            name="authorBio"
            value={authorData.authorBio}
            required
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
}
