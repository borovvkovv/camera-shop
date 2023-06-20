import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router';
import HistoryRouter from '../history-router/history-router';
import AddedToCart from './added-to-cart';

const history = createMemoryHistory();
const setVisibility = jest.fn();

const fakeApp = (
  <HistoryRouter history={history}>
    <Routes>
      <Route
        path='*'
        element={
          <AddedToCart
            isVisible
            setVisibility={setVisibility}
          />
        }
      />
    </Routes>
  </HistoryRouter>
);

describe('Component: AddedToCart', () => {
  it('should render correctly', () => {
    history.push('/fake');

    render(fakeApp);

    expect(
      screen.getByText(/Товар успешно добавлен в корзину/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/)).toBeInTheDocument();
  });
});
