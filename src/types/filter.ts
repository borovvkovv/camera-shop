import { ProductCategory, ProductLevel, ProductType } from '../enums';

export type Filter = {
  priceMin: number | null;
  priceMax: number | null;
  productCategory: ProductCategory;
  productType: ProductType;
  productLevel: ProductLevel;
};
