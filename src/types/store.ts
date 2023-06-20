import { store } from '../store';
import { ProductCard } from './product-card';
import { PromoProduct } from './promo-product';
import { Review } from './review';

export type AppDispatch = typeof store.dispatch;

export type DataProcess = {
  products: ProductCard[];
  isProductsLoading: boolean;
  isProductsLoadingFailed: boolean;
  product: ProductCard | null;
  isProductLoading: boolean;
  similarProducts: ProductCard[];
  promo: PromoProduct | null;
  isPromoLoading: boolean;
  reviews: Review[];
  isCommentSending: boolean;
  isCommentSent: boolean;
};

export type State = ReturnType<typeof store.getState>;
