import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeProduct, getFakePromoProduct } from '../../utils/mock';
import thunk from 'redux-thunk';
import { AppRoute, NameSpace } from '../../const';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router';
import ProductInfoTabs from './product-info-tabs';
import { ProductInfoTabMode } from '../../enums';

const promoProduct = getFakePromoProduct();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Data]: {
    product: null,
    isProductLoading: false,
    promo: promoProduct,
    isPromoLoading: false,
  },
});

const history = createMemoryHistory();

const product = getFakeProduct();

describe('Component: ProductInfoTab', () => {
  it('should show characteristics tab if URL is "/cameras/:id"', () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={
                <ProductInfoTabs
                  product={product}
                  tabMode={null}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push('/cameras/3');

    render(fakeApp);

    expect(screen.getByTestId('buttonCharacteristicsTab')).toHaveClass(
      'is-active'
    );
    expect(screen.getByTestId('characteristicsTab')).toHaveClass('is-active');
    expect(screen.getByTestId('buttonTextTab')).not.toHaveClass('is-active');
    expect(screen.getByTestId('textTab')).not.toHaveClass('is-active');
  });

  it('should show characteristics tab if URL is "/cameras/:id/"', () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={
                <ProductInfoTabs
                  product={product}
                  tabMode={null}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push('/cameras/3/');

    render(fakeApp);

    expect(screen.getByTestId('buttonCharacteristicsTab')).toHaveClass(
      'is-active'
    );
    expect(screen.getByTestId('characteristicsTab')).toHaveClass('is-active');
    expect(screen.getByTestId('buttonTextTab')).not.toHaveClass('is-active');
    expect(screen.getByTestId('textTab')).not.toHaveClass('is-active');
  });

  it('should show characteristics tab if URL is "/cameras/:id/characteristics"', () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={
                <ProductInfoTabs
                  product={product}
                  tabMode={null}
                />
              }
            />
            <Route
              path={AppRoute.ProductTab}
              element={
                <ProductInfoTabs
                  product={product}
                  tabMode={ProductInfoTabMode.Characteristics}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push('/cameras/3/characteristics');

    render(fakeApp);

    expect(screen.getByTestId('buttonCharacteristicsTab')).toHaveClass(
      'is-active'
    );
    expect(screen.getByTestId('characteristicsTab')).toHaveClass('is-active');
    expect(screen.getByTestId('buttonTextTab')).not.toHaveClass('is-active');
    expect(screen.getByTestId('textTab')).not.toHaveClass('is-active');
  });

  it('should show characteristics tab if URL is "/cameras/:id/description"', () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={
                <ProductInfoTabs
                  product={product}
                  tabMode={null}
                />
              }
            />
            <Route
              path={AppRoute.ProductTab}
              element={
                <ProductInfoTabs
                  product={product}
                  tabMode={ProductInfoTabMode.Description}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push('/cameras/3/description');

    render(fakeApp);

    expect(screen.getByTestId('buttonCharacteristicsTab')).not.toHaveClass(
      'is-active'
    );
    expect(screen.getByTestId('characteristicsTab')).not.toHaveClass('is-active');
    expect(screen.getByTestId('buttonTextTab')).toHaveClass('is-active');
    expect(screen.getByTestId('textTab')).toHaveClass('is-active');
  });
});
