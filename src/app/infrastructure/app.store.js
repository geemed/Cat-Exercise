import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import AppReducer from "./app.reducer";

const createThunkMiddleware = arg => {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") return action(dispatch, getState, arg);

    return next(action);
  }
}

const defaultStore = { test: 1 };
const reducer = combineReducers({
  ...AppReducer,
  defaultStore
});

export default () => {
  thunk.withExtraArgument = createThunkMiddleware;

  return compose(
    applyMiddleware(
      thunk.withExtraArgument("gy")
    )
  )(createStore)(reducer, {});
}