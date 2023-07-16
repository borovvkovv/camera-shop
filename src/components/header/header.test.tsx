import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { NameSpace } from '../../const';
import { Provider } from 'react-redux';
import Header from './header';
import { getFakeProductsInBasket } from '../../utils/mock';
import { calculateProductsInBasket } from '../../utils';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const productsInBasket = getFakeProductsInBasket(7);

const store = mockStore({
  [NameSpace.Data]: {},
  [NameSpace.App]: {
    productsInBasket: productsInBasket,
  },
});

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
      [NameSpace.Data]: {},
      [NameSpace.App]: {
        productsInBasket: [],
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
