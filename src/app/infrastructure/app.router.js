import React from "react";
import { Router, Route } from "react-router-dom";

import History from "./app.history";
import Home from "app-component/home/home";
import Cat from "app-component/cat/cat";

const Routes = () => {
  return (
    <Router history={History}>
      <Home>
        <Route path="/">
          <Cat />
        </Route>
      </Home>
    </Router>
  );
};

export default Routes;
