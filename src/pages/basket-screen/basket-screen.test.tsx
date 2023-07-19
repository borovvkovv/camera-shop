import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';
import { getFakeProductsInBasket, getFakeProductsInLocalStorage } from '../../utils/mock';
import { Provider } from 'react-redux';
import BasketScreen from './basket-screen';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: BasketScreen', () => {
  it('should render correctly if basket not empty', () => {
    const basketProducts = getFakeProductsInBasket(9);
    const productsInLocalStorage =
      getFakeProductsInLocalStorage(basketProducts);
    const products = basketProducts.map((productInfo) => productInfo.product);
    const store = mockStore({
      [NameSpace.Data]: {
        products,
      },
      [NameSpace.App]: {
        promoCode: undefined,
      },
    });
    const productsInBasketAsString = JSON.stringify(productsInLocalStorage);
    global.Storage.prototype.getItem = (_: string) => productsInBasketAsString;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <BasketScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(
      screen.queryByText(/Нет товаров в корзине/i)
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('BasketScreenTitle')).toHaveTextContent(
      /Корзина/i
    );
    expect(
      screen.getByText(
        /Если у вас есть промокод на скидку, примените его в этом поле/i
      )
    ).toBeInTheDocument();
  });

  it('should render stub if basket empty', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        products: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <BasketScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Нет товаров в корзине/i)).toBeInTheDocument();
    expect(screen.getByTestId('BasketScreenTitle')).toHaveTextContent(
      /Корзина/i
    );
    expect(
      screen.queryByText(
        /Если у вас есть промокод на скидку, примените его в этом поле/i
      )
    ).not.toBeInTheDocument();
  });
});
