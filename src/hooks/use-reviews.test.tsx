import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import { createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/store';
import { Action } from 'redux';
import { getFakeRevews } from '../utils/mock';
import useReviews from './use-reviews';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Hook: useReviews', () => {
  it('should call action', () => {
    const fakeReviews = getFakeRevews(5);
    const store = mockStore({
      [NameSpace.Data]: {
        reviews: fakeReviews,
      },
    });

    renderHook(() => useReviews(2), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const actions = store.getActions();
    expect(actions[0].type).toEqual('data/fetchReviews/pending');
  });

  it('should return reviews', () => {
    const cameraId = 2;
    const fakeReviews = getFakeRevews(5);
    const store = mockStore({
      [NameSpace.Data]: {
        reviews: fakeReviews,
      },
    });

    const { result } = renderHook(() => useReviews(cameraId), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const { reviews } = result.current;
    expect(reviews).toStrictEqual(
      fakeReviews.filter((review) => review.cameraId === cameraId)
    );
  });
});
