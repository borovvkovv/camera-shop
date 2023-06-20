import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { getFakeProducts } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import ProductCardsList from './product-cards-list';

const products = getFakeProducts(9);
const onBuyClick = jest.fn();

const history = createMemoryHistory();

describe('Component: ProductCardsList', () => {
  it('should render correctly reviews', () => {
    render(
      <HistoryRouter history={history}>
        <ProductCardsList
          products={products}
          onBuyClick={onBuyClick}
        />
      </HistoryRouter>
    );

    expect(screen.queryAllByTestId('productCardMoreInfo').length).toBe(
      products.length
    );
  });
});
