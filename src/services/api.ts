import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = 'https://camera-shop.accelerator.pages.academy';
const TIMEOUT = 5000;

export const createAPI = ():AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      toast.warn(error.message);

      throw error;
    }
  );

  return api;
};
