import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { NameSpace } from '../../const';
import { Provider } from 'react-redux';
import Header from './header';
import { getFakeProductsInBasket, getFakeProductsInLocalStorage } from '../../utils/mock';
import { calculateProductsInBasket } from '../../utils';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const productsInBasket = getFakeProductsInBasket(9);
const productsInLocalStorage = getFakeProductsInLocalStorage(productsInBasket);
const productsInLocalStorageAsString = JSON.stringify(productsInLocalStorage);
const products = productsInBasket.map((productInfo) => productInfo.product);

const store = mockStore({
  [NameSpace.Data]: {
    products,
  },
});

global.Storage.prototype.getItem = (key: string) => productsInLocalStorageAsString;

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Header />
    </HistoryRouter>
  </Provider>
);

describe('Header: Header', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId('formSearchContainer')).toBeInTheDocument();
  });

  it('should render counter with correct number of products in basket', () => {
    render(fakeApp);

    expect(screen.getByTestId('ProductsInBasketCounter')).toHaveTextContent(String(calculateProductsInBasket(productsInBasket)));
  });

  it('should not render counter when correct number of products in basket is empty', () => {
    const storeLocal = mockStore({
      [NameSpace.Data]: {
        products: [],
      },
    });

    const fakeAppLocal = (
      <Provider store={storeLocal}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );
    render(fakeAppLocal);

    expect(screen.queryByTestId('ProductsInBasketCounter')).not.toBeInTheDocument();
  });
});
