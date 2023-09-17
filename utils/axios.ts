import { message } from "antd";
import baseAxios from "../node_modules/axios/index";
import { API } from "./constant";
import { responseParser } from "./rawResponse";

export const axios = baseAxios.create({
  baseURL: API,
  withCredentials: true,
});

const errorHandler = (e: any) => {
  message.error(e?.response?.data?.error?.message || "Something went wrong");
  document.body.classList.remove("loading-indicator");
  return Promise.reject({ ...e });
};
axios.interceptors.request.use(
  function (config) {
    document.body.classList.add("loading-indicator");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (rs) => {
    document.body.classList.remove("loading-indicator");
    rs.data = responseParser(rs.data);
    return rs;
  },
  (e) => errorHandler(e)
);
