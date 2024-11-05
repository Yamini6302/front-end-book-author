import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthorList() {
  const baseUrl = "http://localhost:3000/authors";
  const navigate = useNavigate();
  const [allAuthors, setAllAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [message, setMessage] = useState("");
  const [searchStack, setSearchStack] = useState("");

  // Load all authors from the API
  function loadAllAuthors() {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setAllAuthors(data);
        setFilteredAuthors(data); // Initialize filteredAuthors with allAuthors
      })
      .catch(() => setMessage("Error loading authors"));
  }

  useEffect(() => {
    loadAllAuthors();
  }, []);

  useEffect(() => {
    const filtered = allAuthors.filter((author) =>
      author.authorName.toLowerCase().includes(searchStack) // Filter by author name
    );
    setFilteredAuthors(filtered);
  }, [searchStack, allAuthors]);

  function handleView(id) {
    navigate(`/author-view/${id}`);
  }

  function handleEdit(id) {
    navigate(`/author-edit/${id}`);
  }

  function handleDelete(id) {
    fetch(`${baseUrl}/${id}`, { method: "DELETE" })
      .then(() => {
        const updatedAuthors = allAuthors.filter((author) => author.id !== id);
        setAllAuthors(updatedAuthors);
        setFilteredAuthors(updatedAuthors);
        setMessage("Author successfully deleted");
      })
      .catch(() => setMessage("Cannot delete author"));
  }

  function handleSearch(event) {
    setSearchStack(event.target.value.toLowerCase());
  }

  return (
    <div className="container m-1">
      <h3>LIST OF AUTHORS</h3>
      <input
        type="text"
        placeholder="Search by name"
        onChange={handleSearch}
        className="form-control mb-3"
      />
      {message && <div className="alert alert-info">{message}</div>}
      <table className="table table-striped my-2">
        <thead>
          <tr className="table-dark">
            <th>ID</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredAuthors.length > 0 ? (
            filteredAuthors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.authorName}</td>
                <td>
                  <button onClick={() => handleView(author.id)} className="btn btn-warning">View</button>
                  <button onClick={() => handleEdit(author.id)} className="btn btn-primary m-3">Edit</button>
                  <button onClick={() => handleDelete(author.id)} className="btn btn-danger m-1">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No authors found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
