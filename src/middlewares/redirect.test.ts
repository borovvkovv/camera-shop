import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { AppRoute } from '../const';
import { redirectToRoute } from '../store/action';
import { State } from '../types/store';
import { redirect } from './redirect';

const fakeHistory = {
  location: { pathname: '' },
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../browser-history', () => fakeHistory);

const middlewares = [redirect];

const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  it('should redirect to product', () => {
    store.dispatch(redirectToRoute(AppRoute.Product));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Product);
    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Product)]);
  });
});
