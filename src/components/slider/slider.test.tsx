import {
  getFakeProducts,
} from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { act, render, screen } from '@testing-library/react';
import { PRODUCTS_ON_SLIDER } from '../../const';
import userEvent from '@testing-library/user-event';
import Slider from './slider';

const products = getFakeProducts(7);

const history = createMemoryHistory();

const onBuyClick = jest.fn();

const fakeComponent = (
  <HistoryRouter history={history}>
    <Slider
      products={products}
      onBuyClick={onBuyClick}
    />
  </HistoryRouter>
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
        .filter((e) => e.classList.contains('is-active')).length
    ).toBe(PRODUCTS_ON_SLIDER);
    expect(screen.getByTestId('nextSlide')).not.toBeDisabled();
    expect(screen.getByTestId('prevSlide')).toBeDisabled();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(screen.getByTestId('nextSlide'));
      await userEvent.click(screen.getByTestId('nextSlide'));
      await userEvent.click(screen.getByTestId('nextSlide'));
    });

    expect(screen.getByTestId('nextSlide')).toBeDisabled();
  });
});
