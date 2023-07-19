import { ProductCard } from './product-card';

export type BasketProduct = {
  product: ProductCard;
  quantity: number;
}

export type LocalStorageProduct = {
  productId: number;
  quantity: number;
}
