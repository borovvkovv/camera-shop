import { getFakeProduct } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import ProductCardItem from './product-card-item';
import { ProductCardMode } from '../../enums';
import { render, screen } from '@testing-library/react';
import { AppRoute } from '../../const';
import { Route, Routes } from 'react-router';
import { humanizeProductPrice } from '../../utils';

const product = getFakeProduct();

const history = createMemoryHistory();

const onBuyClick = jest.fn();

const fakeComponent = (
  <HistoryRouter history={history}>
    <Routes>
      <Route
        path={AppRoute.Product}
        element={
          <ProductCardItem
            product={product}
            onBuyClick={onBuyClick}
            addClass=''
            mode={ProductCardMode.Card}
          />
        }
      />
      <Route
        path={AppRoute.Product}
        element={<h1>Страница каталога</h1>}
      />
    </Routes>
  </HistoryRouter>
);

describe('Component: ProductCardItem', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Product.replace(':id', String(product.id)));
    render(fakeComponent);

    expect(screen.getByText(product.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(`${humanizeProductPrice(product.price)}`, 'i')).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});
