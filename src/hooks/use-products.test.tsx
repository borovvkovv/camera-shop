import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import { createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/store';
import { Action } from 'redux';
import { getFakeProduct, getFakeProducts } from '../utils/mock';
import useProduct from './use-product';
import useProducts from './use-products';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Hook: useProducts', () => {
  it('should call action', () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        products: getFakeProducts(1),
        isProductsLoading: true,
        isProductsLoadingFailed: false
      },
    });

    renderHook(() => useProducts(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const actions = store.getActions();
    expect(actions[0].type).toEqual('data/fetchProducts/pending');
  });
});
