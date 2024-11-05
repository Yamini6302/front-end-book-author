import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthorView() {
  const { id } = useParams(); // Get the `id` parameter from the URL
  const navigate = useNavigate();
  const [authorData, setAuthorData] = useState(null); // State to hold author data
  const [message, setMessage] = useState(""); // State to handle error messages

  // Fetch the author details when the component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/authors/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Author not found");
        return res.json();
      })
      .then((data) => {
        setAuthorData(data); // Set the author data into state
      })
      .catch((err) => {
        setMessage("Error: " + err.message); // Handle errors
      });
  }, [id]);

  return (
    <div className="container m-5">
      <h3>View Author</h3>

      {message && <div className="alert alert-danger">{message}</div>}

      {authorData ? (
        <div className="card shadow-sm p-4">
          <div className="card-body">
            <h4 className="card-title">Author: {authorData.authorName}</h4>
            <p className="card-text">
              <strong>Biography:{authorData.biography}</strong> 
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/book-author/author-list")}
            >
              Back to Author List
            </button>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">Loading author details...</div>
      )}
    </div>
  );
}
