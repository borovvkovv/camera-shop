import { act, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { humanizeProductPrice, makeProductName } from '../../utils';
import { getFakeProduct } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import AddToCart from './add-to-cart';
import { MutableRefObject } from 'react';
import userEvent from '@testing-library/user-event';

const setVisibility = jest.fn();
const product = getFakeProduct();
const ref = { current: null } as MutableRefObject<null>;

const history = createMemoryHistory();

describe('Component: AddToCart', () => {
  it('should render correctly', () => {
    const fakeApp = (
      <HistoryRouter history={history}>
        <AddToCart
          product={product}
          modalRef={ref}
          isVisible
          setVisibility={setVisibility}
        />
      </HistoryRouter>
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
      <HistoryRouter history={history}>
        <AddToCart
          product={product}
          modalRef={ref}
          isVisible={false}
          setVisibility={setVisibility}
        />
      </HistoryRouter>
    );

    render(fakeApp);

    expect(screen.getByTestId('AddToCartPopup')).not.toHaveClass('is-active');
  });

  it('should render AddedToCard popup about successful adding to cart', async () => {
    const fakeApp = (
      <HistoryRouter history={history}>
        <AddToCart
          product={product}
          modalRef={ref}
          isVisible
          setVisibility={setVisibility}
        />
      </HistoryRouter>
    );

    render(fakeApp);

    expect(screen.getByTestId('addedToCartPopup')).not.toHaveClass('is-active');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('addToCartButton'));
    });

    expect(screen.getByTestId('addedToCartPopup')).toHaveClass('is-active');
  });
});
