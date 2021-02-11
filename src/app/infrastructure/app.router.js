import React from "react";
import { Router, Route } from "react-router-dom";

import History from "./app.history";
import { Home, Cat, CatItem } from "app-component";

const Routes = () => {
  return (
    <Router history={History}>
      <Home>
        <Route path="/" exact>
          <Cat />
        </Route>
        <Route path="/:breedId" exact>
          <CatItem />
        </Route>
      </Home>
    </Router>
  );
};

export default Routes;
