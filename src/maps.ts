import { FilterProductCategory, ProductCategory, ProductLevel } from './enums';
import { ProductCard } from './types/product-card';
import { SortBy, SortOrder } from './types/sort';

export const productLevelMap = {
  [ProductLevel.Zero]: 'Простая',
  [ProductLevel.Amateur]: 'Любительская',
  [ProductLevel.Professional]: 'Профессиональная'
};

export const productFilterCategoryMap = {
  [FilterProductCategory.Photo]: ProductCategory.Photo,
  [FilterProductCategory.Video]: ProductCategory.Video
};

export const productsSortCallbackMap = {
  [`${SortOrder.Asc}${SortBy.Popularity}`]: (product1: ProductCard, product2: ProductCard) => product1.reviewCount - product2.reviewCount,
  [`${SortOrder.Desc}${SortBy.Popularity}`]: (product1: ProductCard, product2: ProductCard) => product2.reviewCount - product1.reviewCount,
  [`${SortOrder.Asc}${SortBy.Price}`]: (product1: ProductCard, product2: ProductCard) => product1.price - product2.price,
  [`${SortOrder.Desc}${SortBy.Price}`]: (product1: ProductCard, product2: ProductCard) => product2.price - product1.price,
};
