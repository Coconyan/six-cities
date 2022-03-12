import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://9.react.pages.academy/six-cities';
const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});
