import axios, { AxiosError } from 'axios';
import qs from 'qs';
const BASE_URL = import.meta.env.VITE_APP_API_URL as string;
const BASE_PATH = import.meta.env.VITE_APP_API_PATH as string;

const request = axios.create({
  baseURL: `${BASE_URL}v2/api/${BASE_PATH}`,
  paramsSerializer: function (params) {
    return qs.stringify(params, { encode: true });
  },
});

request.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      request.defaults.headers.common['Authorization'] = '';
      document.cookie = 'hexToken=; ';
    }
    return Promise.reject(error);
  }
);

export default request;
