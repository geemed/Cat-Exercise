import React from "react";
import { Provider } from "react-redux";

import AppRouter from "app-base/app.router";
import AppStore from "app-base/app.store";
import { context } from "app-base//app.context"; 

const App = () => {
  const store = AppStore();

  return (
    <Provider context={context} store={store}>
      <AppRouter/>
    </Provider>
  )
}

export default App;