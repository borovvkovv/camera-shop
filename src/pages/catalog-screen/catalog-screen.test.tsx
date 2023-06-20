import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeProducts, getFakePromoProduct } from '../../utils/mock';
import thunk from 'redux-thunk';
import { AppRoute, NameSpace, PRODUCTS_ON_PAGE } from '../../const';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import CatalogScreen from './catalog-screen';
import { Route, Routes } from 'react-router';
import HistoryRouter from '../../components/history-router/history-router';

const products = getFakeProducts(PRODUCTS_ON_PAGE + 1);

const history = createMemoryHistory();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: Banner', () => {

  it('should render correctly', () => {

    const store = mockStore({
      [NameSpace.DATA]: {
        products: products,
        isProductsLoading: false,
        isProductsLoadingFailed: false,
        product: products[0],
        isProductLoading: false,
        promo: getFakePromoProduct(),
        isPromoLoading: false,
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={<h1>Product page</h1>}
            />
            <Route
              path={AppRoute.Root}
              element={<CatalogScreen />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Root);
    render(fakeApp);

    expect(
      screen.getByText('Каталог фото- и видеотехники')
    ).toBeInTheDocument();
  });

  it('should render loading when products is loading', () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        products: [],
        isProductsLoading: true,
        isProductsLoadingFailed: false,
        product: products[0],
        isProductLoading: false,
        promo: getFakePromoProduct(),
        isPromoLoading: false,
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={<h1>Product page</h1>}
            />
            <Route
              path={AppRoute.Root}
              element={<CatalogScreen />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/Загрузка.../)).toBeInTheDocument();
  });

  it('should error when products loading failed', () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        products: [],
        isProductsLoading: false,
        isProductsLoadingFailed: true,
        product: products[0],
        isProductLoading: false,
        promo: getFakePromoProduct(),
        isPromoLoading: false,
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={<h1>Product page</h1>}
            />
            <Route
              path={AppRoute.Root}
              element={<CatalogScreen />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Root);
    render(fakeApp);

    expect(
      screen.getByText(/Не удалось загрузить товары. Попробуйте позже./)
    ).toBeInTheDocument();
  });

  it('should render empty catalog when products is empty', () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        products: [],
        isProductsLoading: false,
        isProductsLoadingFailed: false,
        product: products[0],
        isProductLoading: false,
        promo: getFakePromoProduct(),
        isPromoLoading: false,
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={<h1>Product page</h1>}
            />
            <Route
              path={AppRoute.Root}
              element={<CatalogScreen />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/Товары не найдены/)).toBeInTheDocument();
  });
});
