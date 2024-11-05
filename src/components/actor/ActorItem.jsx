function ActorItem(props) {
  return (
    <>
      <tr key={props.data.actorId}>
        <td>{props.data.actorId}</td>
        <td>{props.data.actorFirstname}</td>
        <td>{props.data.actorLastname}</td>
      </tr>
    </>
  );
}

export default ActorItem;
