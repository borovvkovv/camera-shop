import { ValidPromoCodes } from '../const';

export type PromoCode = {
  coupon: Coupon;
  discount: number;
};

export type Coupon = {
  coupon: (typeof ValidPromoCodes)[number];
};
