import { datatype, name, unique, random } from 'faker';
import { ProductCategory, ProductLevel, ProductType } from '../enums';
import { Filter } from '../types/filter';
import { ProductCard } from '../types/product-card';
import { PromoProduct } from '../types/promo-product';
import { Review } from '../types/review';
import { SearchResultProduct } from '../types/search-result-product';
import { Sort } from '../types/sort';

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

export const getFakeRevews = (quantity: number) =>
  Array.from({ length: quantity }).map((_) => getFakeReview());

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

export const getFakeSearchResultProducts = (quantity: number): SearchResultProduct[] =>
  Array.from({ length: quantity }).map((_) => ({
    productName: datatype.string(),
    urlPath: datatype.string(),
  }));

export const getFakeEmptyFilter = (): Filter => ({
  priceRange: undefined,
  category: undefined,
  type: undefined,
  level: undefined,
});

export const getFakeFilter = (): Filter => ({
  priceRange: {
    min: datatype.number(),
    max: datatype.number(),
  },
  category: 'Photo',
  type: ['Collect', 'Digital'],
  level: ['Zero'],
});

export const getFakeSort = (): Sort => ({
  order: 'Asc',
  by: 'Price'
});
