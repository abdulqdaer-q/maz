import { message } from "antd";
import baseAxios, { Axios, AxiosResponse } from "../node_modules/axios/index";
import { API } from "./constant";
import { responseParser } from "./rawResponse";

export const axios = baseAxios.create({
  baseURL: API,
  withCredentials: true,
});

const errorHandler = (e: any) => {
  message.error(e?.response?.data?.error?.message || "Something went wrong");
  
  return Promise.reject({ ...e });
};
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export interface XAxiosResponse extends AxiosResponse {
  total: number;
}

axios.interceptors.response.use(
  (rs: XAxiosResponse) => {
  
    rs.total = rs.data.meta?.pagination?.total;
    rs.data = responseParser(rs.data);
    
    return rs;
  },
  (e) => errorHandler(e)
);
