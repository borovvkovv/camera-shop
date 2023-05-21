import { ProductCategory, ProductLevel, ProductType } from '../enums';
import { ProductCard } from './product-card';

export type PromoProduct = Pick<
  ProductCard,
  | 'id'
  | 'name'
  | 'previewImg'
  | 'previewImg2x'
  | 'previewImgWebp'
  | 'previewImgWebp2x'
>;
