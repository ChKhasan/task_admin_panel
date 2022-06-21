import axios from "axios";
import { API_URL, TOKEN } from "../const/Api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
});

export const httpRequest = (config) => {
  return axiosInstance(config);
};
