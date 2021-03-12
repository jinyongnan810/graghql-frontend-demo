import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { fetchSongs } from "../queries/fetch-songs";
const deleteSongMutation = gql`
  mutation deleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;
const SongList = () => {
  const { loading, error, data } = useQuery(fetchSongs);
  const [deleteSong, { deleteSongData }] = useMutation(deleteSongMutation);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  const onDelete = async (id, title) => {
    if (confirm(`Delete song ${title}?`)) {
      await deleteSong({
        variables: { id },
        refetchQueries: [{ query: fetchSongs }],
      });
    }
  };

  return (
    <ul className="collection">
      {data.songs.map((song) => (
        <li key={song.id} className="collection-item">
          {song.title}
          <i
            className="material-icons"
            onClick={(e) => onDelete(song.id, song.title)}
          >
            delete
          </i>
        </li>
      ))}
      <Link to="/song-create" className="collection-item">
        Create a new song
      </Link>
    </ul>
  );
};

export default SongList;
