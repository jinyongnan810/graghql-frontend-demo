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
  const onDelete = async (e, id, title) => {
    e.preventDefault();
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
          <Link to={`/songs/${song.id}`}>{song.title}</Link>

          <i
            className="material-icons"
            onClick={(e) => onDelete(e, song.id, song.title)}
          >
            delete
          </i>
        </li>
      ))}
      <Link to="/songs/new" className="collection-item">
        Create a new song
      </Link>
    </ul>
  );
};

export default SongList;
