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
    <div>
      <ul>
        {data.songs.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
