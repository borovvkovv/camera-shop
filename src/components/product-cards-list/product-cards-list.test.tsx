import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { getFakeProducts } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import ProductCardsList from './product-cards-list';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';

const products = getFakeProducts(9);
const onBuyClick = jest.fn();

const history = createMemoryHistory();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Data]: {
    productsRating: [],
  },
});

describe('Component: ProductCardsList', () => {
  it('should render correctly reviews', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCardsList
            products={products}
            onBuyClick={onBuyClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryAllByTestId('productCardMoreInfo').length).toBe(
      products.length
    );
  });
});
