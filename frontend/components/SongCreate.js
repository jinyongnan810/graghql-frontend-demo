import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { fetchSongs } from "../queries/fetch-songs";

const createSongMutation = gql`
  mutation addSong($title: String!) {
    addSong(title: $title) {
      id
    }
  }
`;

const SongCreate = () => {
  const history = useHistory();
  const [songName, setSongName] = useState("");
  const [addSong, { data }] = useMutation(createSongMutation);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (songName.trim()) {
      await addSong({
        variables: { title: songName.trim() },
        refetchQueries: [{ query: fetchSongs }],
      });
      history.push("/");
      // history.go(0);
    }
  };
  return (
    <div>
      <h1>Create a song!</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
        <button>Create Song</button>
      </form>
    </div>
  );
};

export default SongCreate;
