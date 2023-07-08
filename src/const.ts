import { ProductCategory, ProductType } from './enums';

export const MAX_RATING_STARS = 5;
export const PRODUCTS_ON_PAGE = 9;
export const PRODUCTS_ON_SLIDER = 3;
export const COMMENTS_ON_PAGE = 3;

export enum NameSpace {
  Data = 'DATA',
}

export const enum ApiRoute {
  Products = '/cameras',
  Product = '/cameras/{:cameraId}',
  SimilarProducts = '/cameras/{:cameraId}/similar',
  Promo = '/promo',
  Reviews = '/cameras/{:cameraId}/reviews',
  PostReview = '/reviews',
}

export const enum AppRoute {
  Root = '/',
  Catalog = '/page/:id',
  Product = '/cameras/:id',
  ProductTab = '/cameras/:id/:tab',
}

export const CommentStarTitles = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

export const ProductCategoryToTriggerDisabling: keyof typeof ProductCategory = 'Video';

export const ProductTypesToDisable: (keyof typeof ProductType)[] = ['Instant', 'Film'];
