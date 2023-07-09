import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { ApiRoute } from '../const';
const BASE_URL = 'https://camera-shop.accelerator.pages.academy';
const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      if (error.code === AxiosError.ERR_NETWORK) {
        switch (error.config.url) {
          case ApiRoute.Promo:
            toast.warn('Ошибка загрузки промо -предложения');
            break;
          case ApiRoute.Products:
            toast.warn('Ошибка загрузки списка товаров');
            break;
          default:
            toast.warn('Сетевая ошибка');
        }
      }
      throw error;
    }
  );

  return api;
};
