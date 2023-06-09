import type { AxiosInstance, CreateAxiosDefaults } from "axios";
import axios from "axios";
import { getLocalStorageToken } from "~/utils/auth";

const apiConfig: CreateAxiosDefaults<AxiosInstance> = {
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
};

export const api: AxiosInstance = axios.create(apiConfig);
export const authApi: AxiosInstance = axios.create(apiConfig);

authApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getLocalStorageToken()}`;
  return config;
});
