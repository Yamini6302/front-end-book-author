import { useState } from "react";

export default function VenueListHttp() {
  const [allVenues, setAllVenues] = useState([
    {
      venueId: 101,
      venueName: "Pallavas",
      venueSeater: 30,
      isVenueAC: true,
      venueCity: "Trivandrum",
      venueState: "Kerala",
    },
  ]);

  function handleView(venueId) {
    console.log(venueId);
  }

  function handleEdit(venueId) {
    console.log(venueId);
  }

  function handleDelete(venueId) {
    console.log(venueId);
    let filteredVenues = allVenues.filter(
      (eachVenue) => eachVenue.venueId != venueId
    );
    setAllVenues([...filteredVenues]);
  }

  let mappedAllVenues = allVenues.map((eachVenue) => (
    <tr key={eachVenue.venueId}>
      <td>{eachVenue.venueId}</td>
      <td>{eachVenue.venueName}</td>
      <td>{eachVenue.venueSeater} Seats</td>
      <td>{eachVenue.isVenueAC ? "Yes" : "No"}</td>
      <td>{eachVenue.venueCity}</td>
      <td>{eachVenue.venueState}</td>
      <td>
        <button
          onClick={() => handleView(eachVenue.venueId)}
          className="btn btn-warning"
        >
          VIEW
        </button>
      </td>
      <td>
        <button
          onClick={() => handleEdit(eachVenue.venueId)}
          className="btn btn-primary"
        >
          EDIT
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDelete(eachVenue.venueId)}
          className="btn btn-danger"
        >
          DELETE
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="container m-1">
        <h3>LIST OF VENUES</h3>
        <table className="table table-striped">
          <thead>
            <tr className="table-dark">
              <th>ID</th>
              <th>NAME</th>
              <th>Capacity</th>
              <th>AC</th>
              <th>City</th>
              <th>State</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{mappedAllVenues}</tbody>
        </table>
      </div>
    </>
  );
}
