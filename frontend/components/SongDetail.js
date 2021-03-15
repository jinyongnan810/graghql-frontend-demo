import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
const fetchSong = gql`
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

const createLyricMutation = gql`
  mutation addLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;
const SongDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(fetchSong, { variables: { id } });
  const [newLyric, setNewLyric] = useState("");
  const [addLyricToSong, { addLyricData }] = useMutation(createLyricMutation);
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
  const onCreateLyric = async (e) => {
    e.preventDefault();
    if (newLyric.trim()) {
      await addLyricToSong({
        variables: { content: newLyric.trim(), songId: data.song.id },
        // refetchQueries: [{ query: fetchSong, variables: { id } }],
      });
      setNewLyric("");
    }
  };
  return (
    <div>
      <h3>Song Detail</h3>
      <hr />
      <Link to="/">Back</Link>
      {display}
      <form onSubmit={onCreateLyric}>
        <input
          type="text"
          placeholder="Add a lyric!"
          value={newLyric}
          onChange={(e) => setNewLyric(e.target.value)}
        />
        <button>Create Lyrics</button>
      </form>
    </div>
  );
};

export default SongDetail;
