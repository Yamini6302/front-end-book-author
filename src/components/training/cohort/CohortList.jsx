import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CohortList() {
  const navigate = useNavigate(); // created for programatic navigation
  const [searchStack, setSearchStack] = useState("");
  const [allCohorts, setAllCohorts] = useState([
    {
      cohortId: 201,
      cohortSize: 26,
      cohortVenueId: 0,
      cohortStack: "Java Full Stack",
      cohortStartDate: new Date("2024-12-12"),
      cohortDurationWeeks: 6,
      cohortSPOC: "",
      cohortInstructor: "",
    },
    {
      cohortId: 202,
      cohortSize: 25,
      cohortVenueId: 101,
      cohortStack: ".Net Full Stack",
      cohortStartDate: new Date("2024-11-11"),
      cohortDurationWeeks: 6,
      cohortSPOC: "",
      cohortInstructor: "",
    },
    {
      cohortId: 203,
      cohortSize: 20,
      cohortVenueId: 102,
      cohortStack: "Python Full Stack",
      cohortStartDate: new Date("2024-12-12"),
      cohortDurationWeeks: 6,
      cohortSPOC: "",
      cohortInstructor: "",
    },
  ]);
  const [filteredAllCohorts, setFilteredAllCohorts] = useState([...allCohorts]);

  const [allVenues, setAllVenues] = useState([
    {
      venueId: 101,
      venueName: "Pallavas",
      venueSeater: 30,
      isVenueAC: true,
      venueCity: "Trivandrum",
      venueState: "Kerala",
    },
    {
      venueId: 102,
      venueName: "Cholans",
      venueSeater: 30,
      isVenueAC: true,
      venueCity: "Trivandrum",
      venueState: "Kerala",
    },
  ]);

  function handleView(cohortId) {
    console.log(cohortId);
    let getCohort = allCohorts.filter(
      (eachCohort) => eachCohort.cohortId == cohortId
    );
    // navigate to another component with route path /training/cohort-view
    // here we have to use programatic navigation with the help of useNavigate() hook
    navigate("/training/cohort-view/" + cohortId, { state: getCohort[0] });
  }

  function handleEdit(cohortId) {
    console.log(cohortId);
  }

  function handleDelete(cohortId) {
    console.log(cohortId);
    let filteredCohorts = filteredAllCohorts.filter(
      (eachCohort) => eachCohort.cohortId != cohortId
    );
    setFilteredAllCohorts([...filteredCohorts]);
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
    <tr key={eachCohort.cohortId}>
      <td>{eachCohort.cohortId}</td>
      <td>{eachCohort.cohortStack}</td>
      <td>{eachCohort.cohortSize}</td>
      <td>
        {eachCohort.cohortVenueId == 0 ? (
          <button className="btn btn-success">Map</button>
        ) : (
          eachCohort.cohortVenueId
        )}
      </td>
      <td>{eachCohort.cohortStartDate.toDateString()}</td>
      <td>{eachCohort.cohortDurationWeeks} Weeks</td>
      <td>
        {addDays(
          eachCohort.cohortStartDate,
          eachCohort.cohortDurationWeeks * 7
        ).toDateString()}
      </td>
      <td>{eachCohort.cohortSPOC}</td>
      <td>{eachCohort.cohortInstructor}</td>
      <td>
        <button
          onClick={() => handleView(eachCohort.cohortId)}
          className="btn btn-warning"
        >
          <span className="material-symbols-outlined">view_list</span>
        </button>
      </td>
      <td>
        <button
          onClick={() => handleEdit(eachCohort.cohortId)}
          className="btn btn-primary"
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDelete(eachCohort.cohortId)}
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
