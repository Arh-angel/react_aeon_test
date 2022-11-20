import axios, { AxiosRequestConfig } from 'axios';

export const API_URL = 'http://82.202.204.94/tmp/test.php';

const apiAxios = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true
});

export default apiAxios;
