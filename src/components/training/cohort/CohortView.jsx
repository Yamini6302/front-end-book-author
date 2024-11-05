import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CohortView() {
  let { cid } = useParams();
  let navigate = useNavigate();
  let { state } = useLocation();
  return (
    <>
      <div className="container mx-5 px-5">
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          {/* <button onClick={() => navigate("/training/cohort-list")} className="btn btn-primary"> */}
          Back to Cohort List
        </button>

        <div className="card m-2">
          <div className="card-header bg-warning text-light">
            <h3>Cohort Details for cohort ID : {cid}</h3>
          </div>
          <div className="card-body">
            <h6>Cohort Stack : {state.cohortStack}</h6>
            <h6>Cohort Size : {state.cohortSize}</h6>
            <h6>Cohort Duration : {state.cohortDurationWeeks}</h6>
            <h6>Cohort Start Date : {state.cohortStartDate.toDateString()}</h6>
          </div>
        </div>
      </div>
    </>
  );
}
