import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CohortEditHttp() {
  const baseUrl = "http://localhost:3000/cohorts";
  let { cid } = useParams();
  let navigate = useNavigate();
  const [cohortData, setCohortData] = useState({
    id: 0,
    cohortSize: 0,
    cohortVenueId: 0,
    cohortStack: "",
    cohortStartDate: "",
    cohortDurationWeeks: 0,
    cohortSPOC: "",
    cohortInstructor: "",
  });

  const [cohortErrorData, setCohortErrorData] = useState({
    cohortStack: true,
    cohortSize: true,
    cohortStartDate: true,
    cohortDuration: true,
  });

  useEffect(() => {
    fetch(baseUrl + "/" + cid)
      .then((res) => res.json())
      .then((data) => setCohortData(data));
  }, []);

  function handleFormChange(event) {
    setCohortErrorData({
      ...cohortErrorData,
      [event.target.name]: event.target.validity.valid,
    });

    setCohortData({ ...cohortData, [event.target.name]: event.target.value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(cohortData);

    fetch(baseUrl + "/" + cid, {
      method: "PUT",
      body: JSON.stringify(cohortData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => navigate("/training-http/cohort-list-http"));
  }
  return (
    <>
      <div className="container m-5">
        <div className="card">
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div className="card-header bg-primary text-light">
              <h3>UPDATE A COHORT</h3>
            </div>
            <div className="card-body">
              <div className="form-control-group m-1">
                <label htmlFor="cStack" className="form-label">
                  Cohort Stack:
                </label>
                <input
                  type="text"
                  id="cStack"
                  placeholder="Enter Cohort Stack"
                  className="form-control"
                  value={cohortData.cohortStack}
                  required
                  name="cohortStack"
                  onChange={(e) => handleFormChange(e)}
                ></input>
                <div className="text-danger small">
                  {cohortErrorData.cohortStack
                    ? ""
                    : "Cohort Stack is Required!"}
                </div>
              </div>
              <div className="form-control-group m-1">
                <label htmlFor="cSize" className="form-label">
                  Cohort Size:
                </label>
                <input
                  type="text"
                  id="cSize"
                  placeholder="Enter Cohort Size"
                  className="form-control"
                  value={cohortData.cohortSize}
                  required
                  name="cohortSize"
                  onChange={(e) => handleFormChange(e)}
                ></input>
                <div className="text-danger small">
                  {cohortErrorData.cohortSize ? "" : "Cohort Size is Required!"}
                </div>
              </div>
              <div className="form-control-group m-1">
                <label htmlFor="cStartDate" className="form-label">
                  Cohort Start Date:
                </label>
                <input
                  type="date"
                  id="cStartDate"
                  placeholder="Enter Cohort Start Date"
                  className="form-control"
                  value={cohortData.cohortStartDate}
                  required
                  name="cohortStartDate"
                  onChange={(e) => handleFormChange(e)}
                ></input>
                <div className="text-danger small">
                  {cohortErrorData.cohortStartDate
                    ? ""
                    : "Cohort Start Date is Required!"}
                </div>
              </div>
              <div className="form-control-group m-1">
                <label htmlFor="cDuration" className="form-label">
                  Cohort Duration:
                </label>
                <input
                  type="text"
                  id="cDuration"
                  placeholder="Enter Cohort Duration"
                  className="form-control"
                  value={cohortData.cohortDurationWeeks}
                  required
                  name="cohortDurationWeeks"
                  onChange={(e) => handleFormChange(e)}
                ></input>
                <div className="text-danger small">
                  {cohortErrorData.cohortDuration
                    ? ""
                    : "Cohort Duration is Required!"}
                </div>
              </div>
            </div>
            <div className="card-footer bg-primary text-light">
              <button type="submit" className="btn btn-light text-primary">
                UPDATE
              </button>
              <button type="reset" className="btn btn-light text-primary mx-5">
                CLEAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
