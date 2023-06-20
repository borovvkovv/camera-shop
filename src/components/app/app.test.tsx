import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AppRoute, NameSpace } from '../../const';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import {
  getFakeProduct,
  getFakeProducts,
  getFakePromoProduct,
  getFakeRevews,
} from '../../utils/mock';
import { humanizeProductPrice } from '../../utils';
import thunk from 'redux-thunk';

const products = getFakeProducts(20);
const product = getFakeProduct();
const similarProducts = getFakeProducts(9);
const reviews = getFakeRevews(25);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.DATA]: {
    products: products,
    isProductsLoading: false,
    isProductsLoadingFailed: false,
    product: product,
    isProductLoading: false,
    similarProducts: similarProducts,
    promo: getFakePromoProduct(),
    isPromoLoading: false,
    reviews: reviews,
    isCommentSending: false,
    isCommentSent: true,
  },
  [NameSpace.APP]: {
    currentPage: 1,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application routing', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Should render "Catalog" page when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);
    expect(
      screen.getByText(/Каталог фото- и видеотехники/)
    ).toBeInTheDocument();
  });

  it('Should render catalog when user navigate to "/page/1"', () => {
    history.push(AppRoute.Catalog.replace(':id', String(1)));
    render(fakeApp);
    expect(
      screen.getByText(/Каталог фото- и видеотехники/)
    ).toBeInTheDocument();
  });

  it(`Should render catalog when user navigate to "/cameras/${product.id}"`, () => {
    history.push(AppRoute.Product.replace(':id', String(product.id)));
    render(fakeApp);
    expect(screen.getAllByText(product.name).at(0))?.toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(
      screen.getByText(`${humanizeProductPrice(product.price)} ₽`)
    ).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText(product.type)).toBeInTheDocument();
    expect(screen.getByText(product.level)).toBeInTheDocument();
  });

  it(`Should render catalog when user navigate to "/cameras/${product.id}/characteristics"`, () => {
    history.push(
      AppRoute.ProductTab.replace(':id', String(product.id)).replace(
        ':tab',
        'characteristics'
      )
    );
    render(fakeApp);
    expect(screen.getByTestId('buttonCharacteristicsTab')).toHaveClass(
      'is-active'
    );
    expect(screen.getByTestId('characteristicsTab')).toHaveClass('is-active');
    expect(screen.getByTestId('buttonTextTab')).not.toHaveClass('is-active');
    expect(screen.getByTestId('textTab')).not.toHaveClass('is-active');
  });

  it(`Should render catalog when user navigate to "/cameras/${product.id}/text"`, () => {
    history.push(
      AppRoute.ProductTab.replace(':id', String(product.id)).replace(
        ':tab',
        'text'
      )
    );
    render(fakeApp);
    expect(screen.getByTestId('buttonCharacteristicsTab')).not.toHaveClass(
      'is-active'
    );
    expect(screen.getByTestId('characteristicsTab')).not.toHaveClass(
      'is-active'
    );
    expect(screen.getByTestId('buttonTextTab')).toHaveClass('is-active');
    expect(screen.getByTestId('textTab')).toHaveClass('is-active');
  });
});
