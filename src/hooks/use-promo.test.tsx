import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import { createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/store';
import { Action } from 'redux';
import { getFakePromoProduct } from '../utils/mock';
import usePromo from './use-promo';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Hook: useProduct', () => {
  it('should call action', () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        promo: getFakePromoProduct(),
        isPromoLoading: false
      },
    });

    renderHook(() => usePromo(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const actions = store.getActions();
    expect(actions[0].type).toEqual('data/fetchPromo/pending');
  });

  it('should return promo product', () => {
    const fakePromo = getFakePromoProduct();
    const store = mockStore({
      [NameSpace.DATA]: {
        promo: fakePromo,
        isPromoLoading: false,
      },
    });

    const { result } = renderHook(() => usePromo(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const { promo } = result.current;
    expect(promo).toStrictEqual(fakePromo);
  });
});
