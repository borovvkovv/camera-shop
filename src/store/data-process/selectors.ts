import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getProducts = (state: State) => state[NameSpace.Data].products;
export const getIsProductsLoading = (state: State) =>
  state[NameSpace.Data].isProductsLoading;
export const getIsProductsLoadingFailed = (state: State) =>
  state[NameSpace.Data].isProductsLoadingFailed;

export const getProduct = (state: State) => state[NameSpace.Data].product;
export const getIsProductLoading = (state: State) =>
  state[NameSpace.Data].isProductLoading;

export const getSimilarProducts = (state: State) =>
  state[NameSpace.Data].similarProducts;

export const getPromo = (state: State) => state[NameSpace.Data].promo;
export const getIsPromoLoading = (state: State) =>
  state[NameSpace.Data].isPromoLoading;

export const getReviews = (state: State) => state[NameSpace.Data].reviews;
export const getIsCommentSending = (state: State) =>
  state[NameSpace.Data].isCommentSending;
export const getIsCommentSent = (state: State) =>
  state[NameSpace.Data].isCommentSent;
