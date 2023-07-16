import { getFakeProduct, getFakeProductsRating } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import ProductCardItem from './product-card-item';
import { ProductCardMode } from '../../enums';
import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../const';
import { humanizeProductPrice } from '../../utils';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const product = getFakeProduct();
const history = createMemoryHistory();
const onBuyClick = jest.fn();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: ProductCardItem', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        productsRating: getFakeProductsRating(5),
      },
    });

    const fakeComponent = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCardItem
            product={product}
            onBuyClick={onBuyClick}
            addClass={undefined}
            mode={ProductCardMode.Card}
            basketProductIds={[]}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeComponent);

    expect(screen.getByText(product.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${humanizeProductPrice(product.price)} ₽`)
    ).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });

  it('should render basket button if product in basket', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        productsRating: [],
      },
    });

    const fakeComponent = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCardItem
            product={product}
            onBuyClick={onBuyClick}
            addClass={undefined}
            mode={ProductCardMode.Card}
            basketProductIds={[product.id]}
          />
        </HistoryRouter>
      </Provider>
    );
    render(fakeComponent);

    expect(screen.getByText(/В корзине/i)).toBeInTheDocument();
  });
});
