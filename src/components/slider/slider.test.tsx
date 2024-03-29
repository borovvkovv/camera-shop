import {
  getFakeProducts,
} from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import { NameSpace, PRODUCTS_ON_SLIDER } from '../../const';
import userEvent from '@testing-library/user-event';
import Slider from './slider';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const products = getFakeProducts(7);
const history = createMemoryHistory();
const onBuyClick = jest.fn();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Data]: {
    products: [],
    productsRating: [],
  },
});

const fakeComponent = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Slider
        products={products}
        onBuyClick={onBuyClick}
      />
    </HistoryRouter>
  </Provider>
);

describe('Component: Slider', () => {
  it('should render correctly', async () => {
    render(fakeComponent);

    expect(screen.getAllByTestId('productCardSlider').length).toBe(
      products.length
    );
    expect(
      screen
        .getAllByTestId('productCardSlider')
        .filter((similarProduct) =>
          similarProduct.classList.contains('is-active')
        ).length
    ).toBe(PRODUCTS_ON_SLIDER);
    expect(screen.getByTestId('nextSlide')).not.toBeDisabled();
    expect(screen.getByTestId('prevSlide')).toBeDisabled();

    userEvent.click(screen.getByTestId('nextSlide'));
    userEvent.click(screen.getByTestId('nextSlide'));
    userEvent.click(screen.getByTestId('nextSlide'));
    await waitFor(() => {
      expect(screen.getByTestId('nextSlide')).toBeDisabled();
    });
  });
});
