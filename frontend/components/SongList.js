import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { fetchSongs } from "../queries/fetch-songs";
const SongList = () => {
  const { loading, error, data } = useQuery(fetchSongs);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <ul className="collection">
      {data.songs.map((song) => (
        <li key={song.id} className="collection-item">
          {song.title}
        </li>
      ))}
      <Link to="/song-create" className="collection-item">
        Create a new song
      </Link>
    </ul>
  );
};

export default SongList;
