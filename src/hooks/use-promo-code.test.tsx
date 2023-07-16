import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import { getFakePromoCodeInfo } from '../utils/mock';
import usePromoCode from './use-promo-code';

const mockStore = configureMockStore();

describe('Hook: usePromoCode', () => {
  it('should return expected object', () => {
    const promoCode = getFakePromoCodeInfo();
    const isPromoCodeChecking = true;
    const isPromoCodeChecked = false;
    const store = mockStore({
      [NameSpace.App]: {
        promoCode,
        isPromoCodeChecking,
        isPromoCodeChecked,
      },
    });

    const {result} = renderHook(() => usePromoCode(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.currentPromoCode).toEqual(promoCode.coupon);
    expect(result.current.isPromoCodeChecked).toEqual(isPromoCodeChecked);
    expect(result.current.isPromoCodeChecking).toEqual(isPromoCodeChecking);
    expect(result.current.promoCode).toEqual(promoCode);

  });
});
