import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { getCookie } from "@/utils/cookie";

const instance: AxiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/`,
  timeout: 8000,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const access_token = getCookie("token");
  config.headers.Authorization = !!access_token ? `${access_token}` : "";
  return config;
};

const onErrorRequest = (err: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(err);
};

instance.interceptors.request.use(onRequest, onErrorRequest);

export { instance };
