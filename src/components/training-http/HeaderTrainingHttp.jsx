import { Link, Outlet } from "react-router-dom";

export default function HeaderTrainingHttp() {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light m-1">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/training-http/venue-list-http" className="nav-link">
                Venue Http List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/training-http/venue-add-http" className="nav-link">
                Venue Http Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/training-http/cohort-list-http" className="nav-link">
                Cohort Http List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/training-http/cohort-add-http" className="nav-link">
                Cohort Http Add
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet></Outlet>
    </>
  );
}
