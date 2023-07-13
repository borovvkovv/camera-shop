import { store } from '../store';
import { BasketProduct } from './basket';
import { ProductCard } from './product-card';
import { ProductRating } from './product-rating';
import { PromoCode } from './promo-code';
import { PromoProduct } from './promo-product';
import { Review } from './review';

export type AppDispatch = typeof store.dispatch;

export type DataProcess = {
  products: ProductCard[];
  isProductsLoading: boolean;
  isProductsLoadingFailed: boolean;
  product: ProductCard | null;
  productsRating: ProductRating[];
  isProductLoading: boolean;
  similarProducts: ProductCard[];
  promo: PromoProduct | null;
  isPromoLoading: boolean;
  reviews: Review[];
  isCommentSending: boolean;
  isCommentSent: boolean;
};

export type AppProcess = {
  productsInBasket: BasketProduct[];
  promoCode: PromoCode | undefined;
  isPromoCodeChecking: boolean;
  isPromoCodeChecked: boolean;
};

export type State = ReturnType<typeof store.getState>;
