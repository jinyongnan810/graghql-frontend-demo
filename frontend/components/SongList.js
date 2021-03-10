import React from "react";
import { gql, useQuery } from "@apollo/client";

const songsQuery = gql`
  {
    songs {
      id
      title
    }
  }
`;
const SongList = () => {
  const { loading, error, data } = useQuery(songsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <ul className="collection">
      {data.songs.map((song) => (
        <li key={song.id} className="collection-item">
          {song.title}
        </li>
      ))}
    </ul>
  );
};

export default SongList;
