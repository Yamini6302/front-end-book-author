import { useParams, useNavigate } from "react-router-dom";

export default function AuthorView() {
  const { id } = useParams(); // Get the author ID from URL params
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/authors/${id}`)
      .then((res) => res.json())
      .then((data) => setAuthor(data))
      .catch(() => console.error("Error fetching author details"));
  }, [id]);

  if (!author) return <div>Loading...</div>;

  return (
    <div className="container mx-5 px-5">
      <button onClick={() => navigate(-1)} className="btn btn-primary">Back to Author List</button>
      <div className="card m-2">
        <div className="card-header bg-warning text-light">
          <h3>Author Details for ID: {id}</h3>
        </div>
        <div className="card-body">
          <h6>Author Name: {author.authorName}</h6>
          <h6>Bio: {author.authorBio}</h6>
        </div>
      </div>
    </div>
  );
}
