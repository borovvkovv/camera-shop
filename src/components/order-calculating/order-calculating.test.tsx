import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  getFakeProductsInBasket,
  getFakePromoCodeInfo,
} from '../../utils/mock';
import { NameSpace } from '../../const';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import OrderCalculation from './order-calculating';
import {
  calculateDiscountPrice,
  calculateProductPrice,
  calculateProductPriceWithDiscount,
  humanizeProductPrice,
} from '../../utils';
const mockStore = configureMockStore();
const history = createMemoryHistory();
const productsInBasket = getFakeProductsInBasket(7);
const totalSum = humanizeProductPrice(
  calculateProductPrice(productsInBasket, undefined)
);

describe('Component: OrderCalculation', () => {
  it('should render correctly', () => {
    const promoCodeInfo = getFakePromoCodeInfo();
    const discountSumRaw = calculateDiscountPrice(
      productsInBasket,
      promoCodeInfo.discount
    );
    const discount = humanizeProductPrice(discountSumRaw);
    const totalSumWithDiscount = humanizeProductPrice(
      calculateProductPriceWithDiscount(
        productsInBasket,
        promoCodeInfo.discount
      )
    );

    const store = mockStore({
      [NameSpace.App]: {
        productsInBasket: productsInBasket,
        promoCode: promoCodeInfo,
      },
    });
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OrderCalculation
            productsInBasket={productsInBasket}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByText(/Всего:/)).toBeInTheDocument();
    expect(screen.getByText(/Скидка:/)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/)).toBeInTheDocument();

    expect(screen.getByTestId('TotalSum')).toHaveTextContent(totalSum);
    expect(screen.getByTestId('Discount')).toHaveTextContent(discount);
    expect(screen.getByTestId('TotalSumWithDiscount')).toHaveTextContent(
      totalSumWithDiscount
    );
  });

  it('should render price without discount if discount = undefined', () => {
    const store = mockStore({
      [NameSpace.App]: {
        productsInBasket: productsInBasket,
        promoCode: undefined,
      },
    });
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OrderCalculation
            productsInBasket={productsInBasket}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByText(/Всего:/)).toBeInTheDocument();
    expect(screen.getByText(/Скидка:/)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/)).toBeInTheDocument();

    expect(screen.getByTestId('TotalSum')).toHaveTextContent(totalSum);
    expect(screen.getByTestId('Discount')).toHaveTextContent('0');
    expect(screen.getByTestId('TotalSumWithDiscount')).toHaveTextContent(
      totalSum
    );
  });
});
