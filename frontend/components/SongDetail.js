import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
const fetchSongs = gql`
  query Song($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;
const SongDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(fetchSongs, { variables: { id } });
  if (error) {
    return <h4>{error}</h4>;
  }
  const display = loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <h4>{data.song.title}</h4>

      <ul className="collection">
        {data.song.lyrics.map((l) => (
          <li className="collection-item" key={l.id}>
            {l.content}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div>
      <h3>Song Detail</h3>
      <hr />
      {display}
      <button>Create Lyrics</button>
    </div>
  );
};

export default SongDetail;
