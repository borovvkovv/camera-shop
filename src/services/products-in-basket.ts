import { PRODUCTS_IN_BASKET } from '../const';

export const getProductsInBasket = (): string => {
  const products = localStorage.getItem(PRODUCTS_IN_BASKET);
  return products ?? '';
};

export const saveProductsInBasket = (products: string): void => {
  localStorage.setItem(PRODUCTS_IN_BASKET, products);
};

export const dropProductsInBasket = (): void => {
  localStorage.removeItem(PRODUCTS_IN_BASKET);
};
