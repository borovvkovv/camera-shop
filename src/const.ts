import { ProductCard } from './types/product-card';

export const MAX_RATING_STARS = 5;

export const PRODUCTS_ON_PAGE = 9;
export const PRODUCTS_ON_SLIDER = 3;

export enum NameSpace {
  DATA = 'DATA',
  APP = 'APP'
}

export const enum ApiRoute {
  Products = '/cameras',
  Product = '/cameras/{:cameraId}',
  SimilarProducts = '/cameras/{:cameraId}/similar',
  Promo = '/promo',
  Reviews = '/cameras/{:cameraId}/reviews',
  PostReview = '/reviews',
  Coupons = '/coupons',
}

export const enum AppRoute {
  Root = '/',
  Catalog = '/page/:id',
  Product = '/cameras/:id',
  ProductTab = '/cameras/:id/:tab',
}

export const SortType = {
  byPrice: (product1: ProductCard, product2: ProductCard) =>
    product1.price - product2.price,
  byPopularity: (product1: ProductCard, product2: ProductCard) =>
    product1.reviewCount - product2.reviewCount,
} as const;

export const SortByName = {
  ascending: (product1: ProductCard, product2: ProductCard) =>
    product1.name > product2.name ? 1 : -1,
  descending: (product1: ProductCard, product2: ProductCard) =>
    product1.name > product2.name ? -1 : 1,
} as const;
