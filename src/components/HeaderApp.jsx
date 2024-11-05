import { Link } from "react-router-dom";

export default function HeaderApp() {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Counter Component
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fruit-list" className="nav-link">
                Fruit Component
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ecom-list" className="nav-link">
                Ecom Component
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/todo" className="nav-link">
                Todo Component
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/actor-list" className="nav-link">
                Actor Component
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/training" className="nav-link">
                Training
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fake-api" className="nav-link">
                Fake API
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/training-http" className="nav-link">
                Training Http
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/book-author" className="nav-link">
                book-author
              </Link>
            </li>
            
          </ul>
        </div>
      </nav>
    </>
  );
}
