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
  [`${SortOrder.Asc}${SortBy.Popularity}`]: (p1: ProductCard, p2: ProductCard) => p1.reviewCount - p2.reviewCount,
  [`${SortOrder.Desc}${SortBy.Popularity}`]: (p1: ProductCard, p2: ProductCard) => p2.reviewCount - p1.reviewCount,
  [`${SortOrder.Asc}${SortBy.Price}`]: (p1: ProductCard, p2: ProductCard) => p1.price - p2.price,
  [`${SortOrder.Desc}${SortBy.Price}`]: (p1: ProductCard, p2: ProductCard) => p2.price - p1.price,
};
