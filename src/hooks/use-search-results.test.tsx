import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import { createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/store';
import { Action } from 'redux';
import { getFakeProducts } from '../utils/mock';
import useSearchResults from './use-search-results';
import { getTopNProductsByPattern } from '../utils';
import { ProductCard } from '../types/product-card';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Hook: useSearchResults', () => {
  it('should fetch products if storage is empty and search pattern is not empty', () => {
    const products: ProductCard[] = [];
    const store = mockStore({
      [NameSpace.Data]: {
        products: products,
      },
    });

    const { result } = renderHook(() => useSearchResults('test'), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const actions = store.getActions();
    expect(actions[0].type).toEqual('data/fetchProducts/pending');

    const {foundProducts} = result.current;

    expect(foundProducts).toHaveLength(products.length);
  });

  it('should return products from storage', () => {
    const fakeProducts = getFakeProducts(5);
    const searchPattern = fakeProducts[0].name;
    const store = mockStore({
      [NameSpace.Data]: {
        products: fakeProducts,
      },
    });

    const { result } = renderHook(() => useSearchResults(searchPattern), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const actions = store.getActions();
    expect(actions).toHaveLength(0);

    const { foundProducts } = result.current;

    expect(foundProducts).toStrictEqual(
      getTopNProductsByPattern(fakeProducts, searchPattern)
    );
  });
});
