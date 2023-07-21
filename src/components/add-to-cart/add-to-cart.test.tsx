import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { humanizeProductPrice, makeProductName } from '../../utils';
import { getFakeProduct } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import AddToCart from './add-to-cart';
import { MutableRefObject } from 'react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const setVisibility = jest.fn();
const product = getFakeProduct();
const ref = { current: null } as MutableRefObject<null>;

const history = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: AddToCart', () => {
  it('AddToCard popup should be visible when prop isVisible=true', () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddToCart
            product={product}
            modalRef={ref}
            isVisible
            setVisibility={setVisibility}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByTestId('AddToCartPopup')).toHaveClass('is-active');

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(makeProductName(product))).toBeInTheDocument();
    expect(screen.getByText(`${product.level} уровень`)).toBeInTheDocument();
    expect(
      screen.getByText(`${humanizeProductPrice(product.price)} ₽`)
    ).toBeInTheDocument();
  });

  it('AddToCard popup should be hidden when prop isVisible=false', () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddToCart
            product={product}
            modalRef={ref}
            isVisible={false}
            setVisibility={setVisibility}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByTestId('AddToCartPopup')).not.toHaveClass('is-active');
  });

  it('should render AddedToCard popup about successful adding to cart', async () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddToCart
            product={product}
            modalRef={ref}
            isVisible
            setVisibility={setVisibility}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByTestId('addedToCartPopup')).not.toHaveClass('is-active');
    userEvent.click(screen.getByTestId('addToCartButton'));

    await waitFor(() => {
      expect(screen.getByTestId('addedToCartPopup')).toHaveClass('is-active');
    });
  });
});
