import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getProducts = (state: State) => state[NameSpace.DATA].products;
export const getIsProductsLoading = (state: State) => state[NameSpace.DATA].isProductsLoading;
export const getIsProductsLoadingFailed = (state: State) =>
  state[NameSpace.DATA].isProductsLoadingFailed;

export const getProduct = (state: State) => state[NameSpace.DATA].product;
export const getIsProductLoading = (state: State) =>
  state[NameSpace.DATA].isProductLoading;

export const getSimilarProducts = (state: State) =>
  state[NameSpace.DATA].similarProducts;

export const getPromo = (state: State) => state[NameSpace.DATA].promo;
export const getIsPromoLoading = (state: State) =>
  state[NameSpace.DATA].isPromoLoading;

export const getReviews = (state: State) => state[NameSpace.DATA].reviews;
