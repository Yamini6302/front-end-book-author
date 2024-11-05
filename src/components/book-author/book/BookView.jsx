import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function BookView() {
  const { id } = useParams(); // Get the book ID from URL params
  const { state } = useLocation(); // Get passed data (book details)
  const navigate = useNavigate();

  return (
    <div className="container mx-5 px-5">
      <button onClick={() => navigate(-1)} className="btn btn-primary">Back to Book List</button>
      <div className="card m-2">
        <div className="card-header bg-warning text-light">
          <h3>Book Details for ID: {id}</h3> {/* Display the ID */}
        </div>
        <div className="card-body">
          <h6>Book ID: {id}</h6> {/* Display book ID */}
          <h6>Title: {state?.bookTitle}</h6> {/* Display book title */}
          <h6>Price: {state?.bookPrice}</h6> {/* Display book price */}
        </div>
      </div>
    </div>
  );
}
