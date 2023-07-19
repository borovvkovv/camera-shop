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
        if (error.config.url === ApiRoute.Promo) {
          toast.warn('Ошибка загрузки промо -предложения');
        }
        if (error.config.url === ApiRoute.Products) {
          toast.warn('Ошибка загрузки списка товаров');
        }
        if (new RegExp(/cameras\/\d+\/similar/).test(error.config.url ?? '')) {
          toast.warn('Ошибка загрузки списка похожих товаров');
        }
        if (
          new RegExp(/cameras\/\d+\/reviews/).test(error.config.url ?? '')
        ) {
          toast.warn('Ошибка загрузки списка отзывов');
        }
        if (new RegExp(/\/orders/).test(error.config.url ?? '')) {
          toast.warn('Ошибка отправки заказа');
        }
      }
      throw error;
    }
  );

  return api;
};
