import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

const Root = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache({
      typePolicies: {
        SongType: {
          keyFields: ["id"],
        },
        LyricType: {
          keyFields: ["id"],
        },
      },
    }),
  });
  return (
    <ApolloProvider client={client}>
      <div className="header-title" onClick={(e) => (location.href = "/")}>
        Lyrical
      </div>
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route path="/songs/new" component={SongCreate} />
            <Route path="/songs/:id" component={SongDetail} />
            <Route path="/" component={SongList} />
          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
