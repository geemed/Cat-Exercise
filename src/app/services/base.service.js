import axios from "axios";
import config from "app-config/config.json";

const BASE_URL = `${config.baseApi}/${config.apiVersion}/`;

const xhr = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    "x-api-key": config.apiKey,
  },
});

export const get = (url, params) =>
  xhr.get(url, {
    params: params,
  });

export const post = (url, params) =>
  xhr.post(url, {
    params: params,
  });
