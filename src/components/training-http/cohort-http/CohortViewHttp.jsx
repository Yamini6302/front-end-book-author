import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CohortViewHttp() {
  const baseUrl = "http://localhost:3000/cohorts";
  let [fetchedCohort, setFetchedCohort] = useState({
    id: 0,
    cohortSize: 0,
    cohortVenueId: 0,
    cohortStack: "",
    cohortStartDate: "",
    cohortDurationWeeks: 0,
    cohortSPOC: "",
    cohortInstructor: "",
  });
  let { cid } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + "/" + cid)
      .then((res) => res.json())
      .then((data) => setFetchedCohort(data));
  }, []);
  return (
    <>
      <div className="container mx-5 px-5">
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          {/* <button onClick={() => navigate("/training/cohort-list")} className="btn btn-primary"> */}
          Back to Cohort List
        </button>
        {fetchedCohort.cohortStack == "" ? (
          ""
        ) : (
          <div className="card m-2">
            <div className="card-header bg-warning text-light">
              <h3>Cohort Details for cohort ID : {cid}</h3>
            </div>
            <div className="card-body">
              <h6>Cohort Stack : {fetchedCohort.cohortStack}</h6>
              <h6>Cohort Size : {fetchedCohort.cohortSize}</h6>
              <h6>Cohort Duration : {fetchedCohort.cohortDurationWeeks}</h6>
              <h6>
                Cohort Start Date :
                {new Date(fetchedCohort.cohortStartDate).toDateString()}
              </h6>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
