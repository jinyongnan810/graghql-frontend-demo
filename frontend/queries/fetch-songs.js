import { gql } from "@apollo/client";

const fetchSongs = gql`
  {
    songs {
      id
      title
    }
  }
`;

export { fetchSongs };
