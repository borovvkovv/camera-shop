import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import AddedToCart from './added-to-cart';

const history = createMemoryHistory();
const setVisibility = jest.fn();
const getNodeRef = () => ({
  current: document.createElement('div'),
});

const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: AddedToCart', () => {
  it('should render correctly', () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddedToCart
            modalRef={getNodeRef()}
            isVisible
            setVisibility={setVisibility}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByTestId('addedToCartPopup')).toHaveClass('is-active');
    expect(
      screen.getByText(/Товар успешно добавлен в корзину/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/)).toBeInTheDocument();
  });

  it('should hide popup when prop isVisible=false', () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddedToCart
            modalRef={getNodeRef()}
            isVisible={false}
            setVisibility={setVisibility}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByTestId('addedToCartPopup')).not.toHaveClass('is-active');
  });
});
