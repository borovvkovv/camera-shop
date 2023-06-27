import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeProduct, getFakePromoProduct } from '../../utils/mock';
import Banner from './banner';
import thunk from 'redux-thunk';
import { NameSpace } from '../../const';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { productLevelMap } from '../../maps';

const promoProduct = getFakePromoProduct();
const product = getFakeProduct();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        product: product,
        isProductLoading: false,
        promo: promoProduct,
        isPromoLoading: false,
      },
    });
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByText('Новинка!')).toBeInTheDocument();
    expect(screen.getByText(promoProduct.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${
          productLevelMap[product.level]
        } камера от известного производителя`
      )
    ).toBeInTheDocument();
  });

  it('should render loading stub when product is loading', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        product: null,
        isProductLoading: true,
        promo: null,
        isPromoLoading: false,
      },
    });
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByText('Загрузка промо-продукта')).toBeInTheDocument();
  });

  it('should render loading stub when promo is loading', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        product: null,
        isProductLoading: false,
        promo: null,
        isPromoLoading: true,
      },
    });
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByText('Загрузка промо-продукта')).toBeInTheDocument();
  });

  it('should render loading stub when promo and product are loading', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        product: null,
        isProductLoading: true,
        promo: null,
        isPromoLoading: true,
      },
    });
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByText('Загрузка промо-продукта')).toBeInTheDocument();
  });

  it('should render nothing when promo are not loaded', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        product: product,
        isProductLoading: false,
        promo: null,
        isPromoLoading: false,
      },
    });
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.queryByText('Новинка!')).not.toBeInTheDocument();
  });

  it('should hide product level when product are not loaded', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        product: null,
        isProductLoading: false,
        promo: promoProduct,
        isPromoLoading: false,
      },
    });
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(
      screen.queryByText(
        `${
          productLevelMap[product.level]
        } камера от известного производителя`
      )
    ).not.toBeInTheDocument();
  });
});
