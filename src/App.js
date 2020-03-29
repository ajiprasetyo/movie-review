import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./component/Home/Home.js";
import Header from "./component/elements/Header/Header.js";
import Movie from "./component/Movie/Movie.js";
import NotFound from "./component/elements/NotFound/NotFound.js";
import "./App.css";

const App = () => (
  
  <BrowserRouter>
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/:movieId" component={Movie} exact />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default App;
