import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getFakeProductsInBasket } from '../../utils/mock';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ProductInBasketList from './product-in-basket-list';

const productsInBasket = getFakeProductsInBasket(9);
const onProductDelete = jest.fn();

const mockStore = configureMockStore();

const store = mockStore({});

describe('Component: ProductInBasketList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ProductInBasketList
          productsInBasket={productsInBasket}
          onProductDelete={onProductDelete}
        />
      </Provider>
    );

    expect(screen.queryAllByTestId('ProductInBasketItem').length).toBe(
      productsInBasket.length
    );
  });
});
