import { Coupon } from './promo-code-info';

export type Order = {
  camerasIds: number[];
  coupon: Coupon | null;
}
