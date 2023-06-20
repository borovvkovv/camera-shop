import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import { createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/store';
import { Action } from 'redux';
import { getFakeProducts } from '../utils/mock';
import useSimilarProducts from './use-similar-products';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Hook: useSimilarProducts', () => {
  it('should call action', () => {
    const fakeSimilarProducts = getFakeProducts(5);
    const store = mockStore({
      [NameSpace.DATA]: {
        similarProducts: fakeSimilarProducts,
      },
    });

    renderHook(() => useSimilarProducts(2), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const actions = store.getActions();
    expect(actions[0].type).toEqual('data/fetchSimilarProducts/pending');
  });

  it('should return similar products', () => {
    const fakeSimilarProducts = getFakeProducts(5);
    const store = mockStore({
      [NameSpace.DATA]: {
        similarProducts: fakeSimilarProducts,
      },
    });

    const { result } = renderHook(() => useSimilarProducts(2), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const { similarProducts } = result.current;
    expect(similarProducts).toStrictEqual(fakeSimilarProducts);
  });
});
