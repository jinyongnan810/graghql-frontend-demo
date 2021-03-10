import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";

const Root = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div>Lyrical</div>
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route path="/song-create" component={SongCreate} />
            <Route path="/" component={SongList} />
          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
