import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeProduct } from '../../utils/mock';
import thunk from 'redux-thunk';
import { AppRoute, NameSpace } from '../../const';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router';
import HistoryRouter from '../../components/history-router/history-router';
import ProductScreen from './product-screen';
import { HelmetProvider } from 'react-helmet-async';
import { getProductUrl } from '../../utils';

const product = getFakeProduct();

const history = createMemoryHistory();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: ProductScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        product: product,
        productsRating: [],
        isProductLoading: false,
        reviews: [],
        similarProducts: [],
      },
      [NameSpace.App]: {
        productsInBasket: [],
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Product}
                element={<ProductScreen />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    history.push(getProductUrl(product.id));
    render(fakeApp);

    expect(screen.getByText(product.description)).toBeInTheDocument();
  });

  it('should render loading when product is loading', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        product: null,
        productsRating: [],
        isProductLoading: true,
      },
      [NameSpace.App]: {
        productsInBasket: [],
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Product}
                element={<ProductScreen />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    history.push(getProductUrl(product.id));
    render(fakeApp);

    expect(screen.getByText(/Загрузка.../)).toBeInTheDocument();
  });

  it('should set 404 page when product loading failed', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        product: null,
        productsRating: [],
        isProductLoading: false,
      },
      [NameSpace.App]: {
        productsInBasket: [],
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Product}
                element={<ProductScreen />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    history.push(getProductUrl(product.id));
    render(fakeApp);

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
  });
});
