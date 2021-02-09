import React from "react";
import { Router, Route } from "react-router-dom";

import History from "./app.history";
import Cat from "app-component/cat/cat";

const Routes = () => {
  return (
    <Router history={History}>
      <Route path="/">
        <Cat />
      </Route>
    </Router>
  )
}

export default Routes;