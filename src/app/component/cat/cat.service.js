import * as api from "app-service/base.service.js";

export const getCats = async () => {
  const result = await api.get("breeds");

  return result.data || [];
};

export const getCatsByBreed = async (params) => {
  const result = await api.get("images/search", params);

  return result.data || [];
};

export const getCatByBreed = async (breedId) => {
  const result = await api.get(`images/${breedId}`);

  return result.data || {};
};
