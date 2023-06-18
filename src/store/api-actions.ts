import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../const';
import { Coupon } from '../types/coupon';
import { Order } from '../types/order';
import { ProductCard } from '../types/product-card';
import { PromoProduct } from '../types/promo-product';
import { Review } from '../types/review';
import { AppDispatch, State } from '../types/store';
import { UserReview } from '../types/user-review';

export const fetchProductsAction = createAsyncThunk<
  ProductCard[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchProducts', async (_arg, { extra: api }) => {
  const { data } = await api.get<ProductCard[]>(ApiRoute.Products);
  return data;
});

export const fetchProductAction = createAsyncThunk<
  ProductCard,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchProduct', async (id, { extra: api }) => {
  const { data } = await api.get<ProductCard>(
    ApiRoute.Product.replace('{:cameraId}', String(id))
  );
  return data;
});

export const fetchSimilarProductsAction = createAsyncThunk<
  ProductCard[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarProducts', async (id, { extra: api }) => {
  const { data } = await api.get<ProductCard[]>(
    ApiRoute.SimilarProducts.replace('{:cameraId}', String(id))
  );
  return data;
});

export const fetchPromoAction = createAsyncThunk<
  PromoProduct,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromo', async (_arg, { extra: api }) => {
  const { data } = await api.get<PromoProduct>(ApiRoute.Promo);
  return data;
});

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchReviews', async (id, { extra: api }) => {
  const { data } = await api.get<Review[]>(
    ApiRoute.Reviews.replace('{:cameraId}', String(id))
  );
  return data;
});

export const addReviewAction = createAsyncThunk<
  Review,
  UserReview,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/addReview', async (review, { extra: api }) => {
  const { data } = await api.post<Review>(ApiRoute.PostReview, review);
  return data;
});

export const checkCouponAction = createAsyncThunk<
  number,
  Coupon,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/addReview', async (coupon, { extra: api }) => {
  const { data } = await api.post<number>(ApiRoute.Coupons, coupon);
  return data;
});

export const makeOrderAction = createAsyncThunk<
  void,
  Order,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/addReview', async (order, { extra: api }) => {
  await api.post(ApiRoute.Coupons, order);
});