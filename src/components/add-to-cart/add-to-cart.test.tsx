import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router';
import { getFakeProduct } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import AddToCart from './add-to-cart';

const setVisibility = jest.fn();
const history = createMemoryHistory();

describe('Component: AddToCart', () => {
  it('should render correctly', () => {
    const product = getFakeProduct();

    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='*'
            element={
              <AddToCart
                product={product}
                isVisible
                setVisibility={setVisibility}
              />
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
  });

});
