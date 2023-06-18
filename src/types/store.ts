import { store } from '../store';
import { Filter } from './filter';
import { ProductCard } from './product-card';
import { PromoProduct } from './promo-product';
import { Sort } from './sort';
import { UserReview } from './user-review';

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
  reviews: UserReview[];
};

export type AppProcess = {
  currentFilter: Filter | null;
  currentSort: Sort | null;
  currentPage: number;
};

export type State = ReturnType<typeof store.getState>;
