import * as types from "./cat.type";

const initialState = {
  data: [],
  breeds: [],
  breed: {},
  page: 1,
  limit: 10,
  breedId: "",
  hasLoadMore: true,
  isLoading: false,
  hasError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case types.GET_CATS:
      return Object.assign({}, state, {
        data: action.result,
        hasError: false,
      });
    case types.GET_BY_BREEDS:
      return Object.assign({}, state, {
        breeds: action.result.breeds,
        breedId: action.result.breedId,
        page: action.result.page,
        hasLoadMore: action.result.hasLoadMore,
        hasError: false,
      });
    case types.GET_BY_BREED:
      return Object.assign({}, state, {
        breed: action.result.breed,
        breedId: action.result.breedId,
        hasError: false,
      });
    case types.CLEAR_BREED:
      return Object.assign({}, state, {
        breed: {},
        hasError: false,
      });
    case types.IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.result,
        hasError: false,
      });
    case types.HAS_ERROR:
      return Object.assign({}, state, {
        hasError: action.result,
      });
  }
};

export default reducer;
