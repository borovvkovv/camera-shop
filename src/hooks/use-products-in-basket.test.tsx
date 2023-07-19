import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import { createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/store';
import { Action } from 'redux';
import { getFakeProducts, getFakeProductsInLocalStorage } from '../utils/mock';
import useProductsInBasket from './use-products-in-basket';
import { BasketProduct } from '../types/basket';
import { getProductsInBasket } from '../utils';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const products = getFakeProducts(9);
const fakeProductsInBasket: BasketProduct[] = getProductsInBasket(products);
const productsInLocalStorage = getFakeProductsInLocalStorage(fakeProductsInBasket);
const productsInBasketAsString = JSON.stringify(productsInLocalStorage);
global.Storage.prototype.getItem = (_: string) => productsInBasketAsString;

describe('Hook: useProductInBasket', () => {
  it('should return products from fake local storage', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        products,
      },
    });

    const { result } = renderHook(() => useProductsInBasket(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const { productsInBasket } = result.current;
    expect(productsInBasket).toStrictEqual(fakeProductsInBasket);
  });

});
