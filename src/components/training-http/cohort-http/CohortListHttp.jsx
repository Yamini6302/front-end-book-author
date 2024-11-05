import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CohortListHttp() {
  const baseUrl = "http://localhost:3000/cohorts";
  const navigate = useNavigate(); // created for programatic navigation
  const [searchStack, setSearchStack] = useState("");
  const [allCohorts, setAllCohorts] = useState([]);
  const [filteredAllCohorts, setFilteredAllCohorts] = useState([...allCohorts]);
  const [allVenues, setAllVenues] = useState([]);

  function loadAllCohorts() {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setAllCohorts([...data]);
        setFilteredAllCohorts([...data]);
        console.log(data);
      });
  }

  useEffect(() => {
    loadAllCohorts();
  }, []);

  function handleView(id) {
    console.log(id);
    navigate("/training-http/cohort-view-http/" + id);
  }

  function handleEdit(id) {
    console.log(id);
    navigate("/training-http/cohort-edit-http/" + id);
  }

  function handleDelete(id) {
    console.log(id);
    // here we have to consume the delete endpoint
    fetch(baseUrl + "/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => loadAllCohorts());
  }

  function handleSearch(event) {
    setSearchStack(event.target.value);
    let filterAllCohort = allCohorts.filter((eachCohort) =>
      eachCohort.cohortStack
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setFilteredAllCohorts([...filterAllCohort]);
  }

  function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }
  let mappedAllCohorts = filteredAllCohorts.map((eachCohort) => (
    <tr key={eachCohort.id}>
      <td>{eachCohort.id}</td>
      <td>{eachCohort.cohortStack}</td>
      <td>{eachCohort.cohortSize}</td>
      <td>
        {eachCohort.cohortVenueId == 0 ? (
          <button className="btn btn-success">Map</button>
        ) : (
          eachCohort.cohortVenueId
        )}
      </td>
      <td>{new Date(eachCohort.cohortStartDate).toDateString()}</td>
      <td>{eachCohort.cohortDurationWeeks} Weeks</td>
      <td>
        {addDays(
          new Date(eachCohort.cohortStartDate),
          eachCohort.cohortDurationWeeks * 7
        ).toDateString()}
      </td>
      <td>{eachCohort.cohortSPOC}</td>
      <td>{eachCohort.cohortInstructor}</td>
      <td>
        <button
          onClick={() => handleView(eachCohort.id)}
          className="btn btn-warning"
        >
          <span className="material-symbols-outlined">view_list</span>
        </button>
      </td>
      <td>
        <button
          onClick={() => handleEdit(eachCohort.id)}
          className="btn btn-primary"
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDelete(eachCohort.id)}
          className="btn btn-danger"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="container m-1">
        <h3>LIST OF COHORTS</h3>
        <div className="formC-control-group">
          <label htmlFor="sStack" className="form-label">
            Search Stack:
          </label>
          <input
            type="text"
            id="sStack"
            placeholder="Enter search string"
            onChange={(e) => handleSearch(e)}
          ></input>
        </div>
        <table className="table table-striped">
          <thead>
            <tr className="table-dark">
              <th>ID</th>
              <th>STACK</th>
              <th>SIZE</th>
              <th>VENUE</th>
              <th>START</th>
              <th>DURATION</th>
              <th>END</th>
              <th>SPOC</th>
              <th>INSTRUCTOR</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{mappedAllCohorts}</tbody>
        </table>
      </div>
    </>
  );
}
