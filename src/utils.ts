import { ProductCategory } from './enums';
import { ProductCard } from './types/product-card';

export function makeProductName(product: ProductCard) {
  return `${product.type} ${
    product.category === ProductCategory.Photo
      ? 'фотокамера'
      : product.category.toLowerCase()
  }`;
}

export function humanizeProductPrice(price: number) {
  return price.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace(/,/g, ' ');
}
