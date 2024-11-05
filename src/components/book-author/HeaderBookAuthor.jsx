import { Link, Outlet } from "react-router-dom";

export default function HeaderBookAuthor() {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light m-1">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/book-author/books-list" className="nav-link">
                Book List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/book-author/add-book" className="nav-link">
                Add Book
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/book-author/authors" className="nav-link">
                Authors List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/book-author/add-author" className="nav-link">
                Add Author
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
