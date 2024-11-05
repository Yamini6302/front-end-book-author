import { useEffect, useState } from "react";

export default function JsonPlaceholder() {
  const [allPosts, setAllPosts] = useState([]);

  function handleClick() {
    // here let us consume the fake endpoint
    let baseUrl = "https://jsonplaceholder.typicode.com/posts";
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllPosts([...data]);
      });
  }

  let mappedAllPosts = allPosts.map((eachPost) => (
    <tr key={eachPost.id}>
      <td>{eachPost.id}</td>
      <td>{eachPost.title}</td>
      <td>{eachPost.userId}</td>
      <td>{eachPost.body}</td>
    </tr>
  ));

  return (
    <>
      <div className="container m-2">
        <button className="btn btn-success" onClick={handleClick}>
          Click to get posts from Jsonplaceholder
        </button>
        <table className="table table-stripped">
          <thead>
            <tr className="bg-dark text-light">
              <th>ID</th>
              <th>TITLE</th>
              <th>USER ID</th>
              <th>POST</th>
            </tr>
          </thead>
          <tbody>{mappedAllPosts}</tbody>
        </table>
      </div>
    </>
  );
}
