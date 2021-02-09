import * as types from "./cat.type";

const initialState = { 
  data: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case types.GET_CATS:
      return Object.assign({}, state, {
        data: action.result,
      });
  }
};

export default reducer;