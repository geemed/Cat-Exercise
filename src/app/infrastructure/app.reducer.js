import CatReducer from "app-component/cat/cat.reducer";

const createReducer = (reducerFn, reducerName) => {
  return (state, action) => {
    const { name } = action;
    const isInitiated = state === undefined;

    if (name !== reducerName && !isInitiated) return state;

    return reducerFn(state, action);
  }
};

const reducers = {
  cat: createReducer(CatReducer, "cat")
};

export default reducers;