import _ from "lodash";

import * as service from "./cat.service";
import * as types from "./cat.type";

const action = (result, type) => ({
  type,
  result,
  name: "cat",
});

const getDistinctCatsByBreed = (currBreed, newBreed) => {
  if (!(currBreed || []).length) return newBreed;

  return _.filter(newBreed, (n) => {
    return !_.some(currBreed, (c) => {
      return c.id === n.id;
    });
  });
};

const findCatInBreeds = (breeds, breedId) => {
  const breed = _.find(breeds, (b) => b.id === breedId);

  return action(
    {
      breed: breed,
      breedId: ((breed.breeds || [])[0] || {}).id,
    },
    types.GET_BY_BREED
  );
};

export const getCats = async () => {
  try {
    const result = await service.getCats();

    return action(result, types.GET_CATS);
  } catch (e) {
    return action(true, types.HAS_ERROR);
  }
};

export const getCatsByBreed = async (breeds, breedId, page, limit) => {
  try {
    const params = { breed_id: breedId, page, limit };
    const result = await service.getCatsByBreed(params);
    const data = getDistinctCatsByBreed(breeds, result);

    return action(
      {
        breeds: [].concat(breeds, data),
        breedId,
        page,
        hasLoadMore: !breedId ? true : data.length,
      },
      types.GET_BY_BREEDS
    );
  } catch (e) {
    return action(true, types.HAS_ERROR);
  }
};

export const getCatByBreed = async (breeds, breedId) => {
  try {
    if (breeds && breeds.length) return findCatInBreeds(breeds, breedId);

    const result = await service.getCatByBreed(breedId);

    return action(
      {
        breed: result,
        breedId: ((result.breeds || [])[0] || {}).id,
      },
      types.GET_BY_BREED
    );
  } catch (e) {
    return action(true, types.HAS_ERROR);
  }
};

export const clearCatByBreed = () => {
  return action(null, types.CLEAR_BREED);
};

export const setLoading = (isLoading) => {
  return action(isLoading, types.IS_LOADING);
};

export const setError = (hasError) => {
  return action(hasError, types.HAS_ERROR);
};

export const getErrorMessage = () => {
  return "Apologies but we could not load new cats for you at this time! Miau!";
};
