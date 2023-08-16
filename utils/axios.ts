import baseAxios from "../node_modules/axios/index";
import { API } from "./constant";


export const axios = baseAxios.create({
    baseURL: API,
    withCredentials: true
})