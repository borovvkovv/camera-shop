import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://camera-shop.accelerator.pages.academy';
const TIMEOUT = 5000;

export const createAPI = ():AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  return api;
};
