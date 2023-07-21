import { getFakeProductInBasket } from '../../utils/mock';
import { render, screen, waitFor } from '@testing-library/react';
import { calculateProductPrice, humanizeProductPrice, makeProductName } from '../../utils';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import ProductInBasketItem from './product-in-basket-item';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: ProductCardItem', () => {
  it('should render correctly', () => {
    const store = mockStore({});
    const productInfo = getFakeProductInBasket();
    const onProductDelete = jest.fn();

    const productName = makeProductName(productInfo.product);
    const vendorCode = productInfo.product.vendorCode;
    const level = `${productInfo.product.level} уровень`;
    const productPrice = `${humanizeProductPrice(productInfo.product.price)} ₽`;
    const totalProductPriceRaw = calculateProductPrice([productInfo], undefined);
    const totalProductPrice = `${humanizeProductPrice(totalProductPriceRaw)} ₽`;

    const fakeComponent = (
      <Provider store={store}>
        <ProductInBasketItem
          productInfo={productInfo}
          onProductDelete={onProductDelete}
        />
      </Provider>
    );

    render(fakeComponent);

    expect(screen.getByText(/Общая цена:/i)).toBeInTheDocument();
    expect(screen.getByText(productName)).toBeInTheDocument();
    expect(screen.getByText(vendorCode)).toBeInTheDocument();
    expect(screen.getByText(level)).toBeInTheDocument();
    expect(screen.getByTestId('ProductPrice')).toHaveTextContent(productPrice);
    expect(screen.getByTestId('ProductSumPrice')).toHaveTextContent(
      totalProductPrice
    );
  });

  it('should call delete function when user click delete button', async () => {
    const store = mockStore({});
    const productInfo = getFakeProductInBasket();
    const onProductDelete = jest.fn();

    const fakeComponent = (
      <Provider store={store}>
        <ProductInBasketItem
          productInfo={productInfo}
          onProductDelete={onProductDelete}
        />
      </Provider>
    );

    render(fakeComponent);

    userEvent.click(screen.getByTestId('DeleteProductButton'));
    await waitFor(() => {
      expect(onProductDelete).toBeCalledTimes(1);
    });
  });

});
