import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getPromoCode = (state: State) =>
  state[NameSpace.App].promoCode;
export const getIsPromoCodeChecked = (state: State) =>
  state[NameSpace.App].isPromoCodeChecked;
export const getIsPromoCodeChecking = (state: State) =>
  state[NameSpace.App].isPromoCodeChecking;
export const getIsOrderSentSuccessfully = (state: State) =>
  state[NameSpace.App].isOrderSentSuccessfully;
