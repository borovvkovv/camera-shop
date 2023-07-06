import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import { createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/store';
import { Action } from 'redux';
import { getFakeProductRating } from '../utils/mock';
import useRating from './use-rating';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const productId = 1;

describe('Hook: useProduct', () => {
  it('should call action', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        productsRating: []
      },
    });

    renderHook(() => useRating(productId), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const actions = store.getActions();
    expect(actions[0].type).toEqual('data/fetchReviews/pending');
  });

  it('should return product rating info', () => {
    const fakeRatingInfo = getFakeProductRating();
    const store = mockStore({
      [NameSpace.Data]: {
        productsRating: [fakeRatingInfo],
      },
    });

    const { result } = renderHook(() => useRating(fakeRatingInfo.productId), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const { ratingInfo } = result.current;
    expect(ratingInfo).toStrictEqual(fakeRatingInfo);
  });
});
