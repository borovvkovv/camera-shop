import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import { createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/store';
import { Action } from 'redux';
import { getFakeProduct } from '../utils/mock';
import useProduct from './use-product';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Hook: useProduct', () => {
  it('should call action when given id is number', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        product: getFakeProduct(3),
        isProductLoading: false
      },
    });

    renderHook(() => useProduct(3), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const actions = store.getActions();
    expect(actions[0].type).toEqual('data/fetchProduct/pending');
  });

  it('should return product if given offer id is number', () => {
    const fakeProduct = getFakeProduct(4);
    const store = mockStore({
      [NameSpace.Data]: {
        product: fakeProduct,
        isProductLoading: false,
      },
    });

    const {result} = renderHook(() => useProduct(4), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const {product} = result.current;
    expect(product).toStrictEqual(fakeProduct);
  });

  it('should not call action when given id is NaN', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        product: null,
        isProductLoading: false,
      },
    });

    const productId = NaN;

    renderHook(() => useProduct(productId), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const actions = store.getActions();
    expect(actions.length).toBe(0);
  });
});
