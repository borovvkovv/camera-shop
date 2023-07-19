import { ValidPromoCodes } from '../const';

export type PromoCodeInfo = {
  coupon: Coupon;
  discount: number;
};

export type Coupon = (typeof ValidPromoCodes)[number];
