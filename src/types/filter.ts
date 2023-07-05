import { FilterProductCategory, ProductLevel, ProductType } from '../enums';

export type PriceRangeFilterType = {
  min?: number;
  max?: number;
};

export type Filter = {
  priceRange?: PriceRangeFilterType;
  category?: keyof typeof FilterProductCategory;
  type?: (keyof typeof ProductType)[];
  level?: (keyof typeof ProductLevel)[];
};
