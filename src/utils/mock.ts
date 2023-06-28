import {
  datatype,
  name,
  unique,
  random,
} from 'faker';
import { ProductCategory, ProductLevel, ProductType } from '../enums';
import { ProductCard } from '../types/product-card';
import { PromoProduct } from '../types/promo-product';
import { Review } from '../types/review';

export const getFakeProduct = (id?: number): ProductCard => ({
  id: unique(() => id ?? datatype.number()),
  name: name.firstName(),
  vendorCode: unique(() => datatype.string()),
  type: ProductType.Collect,
  category: ProductCategory.Photo,
  description: random.words(),
  level: ProductLevel.Amateur,
  price: datatype.number(),
  reviewCount: datatype.number(),
  previewImg: datatype.string(),
  previewImg2x: datatype.string(),
  previewImgWebp: datatype.string(),
  previewImgWebp2x: datatype.string(),
});

export const getFakeProducts = (quantity: number) =>
  Array.from({ length: quantity }).map((_) => getFakeProduct());

export const getFakePromoProduct = (): PromoProduct => ({
  id: unique(() => datatype.number()),
  name: name.firstName(),
  previewImg: datatype.string(),
  previewImg2x: datatype.string(),
  previewImgWebp: datatype.string(),
  previewImgWebp2x: datatype.string(),
});

export const getFakeReview = (): Review => ({
  id: unique(() => datatype.string()),
  createAt: datatype.datetime().toString(),
  cameraId: unique(() => datatype.number()),
  userName: name.firstName(),
  advantage: random.words(),
  disadvantage: random.words(),
  review: random.words(),
  rating: datatype.number(),
});

export const getFakeRevews = (quantity: number) => Array.from({length: quantity}).map((_) => getFakeReview());

export const getFakeUserReview = () => ({
  cameraId: unique(() => datatype.number()),
  userName: name.firstName(),
  advantage: random.words(),
  disadvantage: random.words(),
  review: random.words(),
  rating: datatype.number(),
});

export const getFakeProductRating = () => ({
  productId: datatype.number(),
  rating: datatype.number(),
});

export const getFakeProductsRating = (quantity: number) =>
  Array.from({ length: quantity }).map((_) => getFakeProductRating());
