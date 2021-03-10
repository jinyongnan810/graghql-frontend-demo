import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const SongCreate = () => {
  const [songName, setSongName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (songName.trim()) {
      const createSongMutation = gql`
        {
          mutation addSong{
              addSong(title:"${songName.trim()}"){
                id
                }
          }
        }
      `;
      const { loading, error, data } = useQuery(createSongMutation);
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
