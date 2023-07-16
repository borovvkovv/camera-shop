import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getFakePromoCodeInfo } from '../../utils/mock';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';
import PromoCode from './promo-code';

const mockStore = configureMockStore();

describe('Component: PromoCode', () => {
  it('should render success state if promo code is valid', () => {
    const promoCodeInfo = getFakePromoCodeInfo();
    const store = mockStore({
      [NameSpace.App]: {
        promoCode: promoCodeInfo,
        isPromoCodeChecked: true,
        isPromoCodeChecking: false,
      },
    });

    render(
      <Provider store={store}>
        <PromoCode />
      </Provider>
    );


    expect(screen.getByTestId('PromoCodeInput')).toHaveClass('is-valid');
  });

  it('should render usual state if promo code has not been fetched', () => {
    const store = mockStore({
      [NameSpace.App]: {
        promoCode: undefined,
        isPromoCodeChecked: false,
        isPromoCodeChecking: false,
      },
    });

    render(
      <Provider store={store}>
        <PromoCode />
      </Provider>
    );

    expect(screen.getByTestId('PromoCodeInput')).not.toHaveClass('is-valid');
    expect(screen.getByTestId('PromoCodeInput')).not.toHaveClass('is-invalid');
  });

  it('should render fail state if promo code is invalid', () => {
    const store = mockStore({
      [NameSpace.App]: {
        promoCode: undefined,
        isPromoCodeChecked: true,
        isPromoCodeChecking: false,
      },
    });

    render(
      <Provider store={store}>
        <PromoCode />
      </Provider>
    );

    expect(screen.getByTestId('PromoCodeInput')).toHaveClass('is-invalid');
  });
});
