import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  getFakeProduct,
} from '../../utils/mock';
import thunk from 'redux-thunk';
import { AppRoute, NameSpace } from '../../const';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router';
import HistoryRouter from '../../components/history-router/history-router';
import ProductScreen from './product-screen';

const product = getFakeProduct();

const history = createMemoryHistory();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: ProductScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        product: product,
        isProductLoading: false,
        reviews: [],
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={<ProductScreen />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Product.replace(':id', product.id.toString()));
    render(fakeApp);

    expect(screen.getByText(product.description)).toBeInTheDocument();
  });

  it('should render loading when product is loading', () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        product: null,
        isProductLoading: true,
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={<ProductScreen />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Product.replace(':id', product.id.toString()));
    render(fakeApp);

    expect(screen.getByText(/Загрузка.../)).toBeInTheDocument();
  });

  it('should error when product loading failed', () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        product: null,
        isProductLoading: false,
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={<ProductScreen />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Product.replace(':id', product.id.toString()));
    render(fakeApp);

    expect(
      screen.getByText(/Не удалось загрузить товар. Попробуйте позже./)
    ).toBeInTheDocument();
  });
});
