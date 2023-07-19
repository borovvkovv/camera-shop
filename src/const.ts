import { ProductCategory, ProductType } from './enums';

export const MAX_RATING_STARS = 5;
export const PRODUCTS_ON_PAGE = 9;
export const PRODUCTS_ON_SLIDER = 3;
export const COMMENTS_ON_PAGE = 3;

export enum NameSpace {
  Data = 'DATA',
  App= 'APP'
}

export const enum ApiRoute {
  Products = '/cameras',
  Product = '/cameras/{:cameraId}',
  SimilarProducts = '/cameras/{:cameraId}/similar',
  Promo = '/promo',
  Reviews = '/cameras/{:cameraId}/reviews',
  PostReview = '/reviews',
  PromoCode = '/coupons',
  Order = '/orders'
}

export const enum AppRoute {
  Root = '/',
  Catalog = '/page/:id',
  Product = '/cameras/:id',
  ProductTab = '/cameras/:id/:tab',
  Basket = '/basket'
}

export const CommentStarTitles = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

export const ProductCategoryToTriggerDisabling: keyof typeof ProductCategory = 'Video';

export const ProductTypesToDisable: (keyof typeof ProductType)[] = ['Instant', 'Film'];

export const ValidPromoCodes = ['camera-333', 'camera-444', 'camera-555'] as const;

export const PRODUCTS_IN_BASKET = 'PRODUTS_IN_BASKET';
