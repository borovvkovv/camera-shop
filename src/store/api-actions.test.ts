import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { State } from '../types/store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { ApiRoute } from '../const';
import {
  addReviewAction,
  fetchProductAction,
  fetchProductsAction,
  fetchPromoAction,
  fetchPromoCodeAction,
  fetchReviewsAction,
  fetchSimilarProductsAction,
  makeOrderAction,
} from './api-actions';
import {
  getFakeOrder,
  getFakeProduct,
  getFakeProducts,
  getFakePromoProduct,
  getFakeRevews,
  getFakeReview,
  getFakeUserReview,
} from '../utils/mock';

const api = createAPI();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Async actions', () => {
  it('should set products to payload when GET /cameras', async () => {
    const store = mockStore();
    const products = getFakeProducts(5);

    mockApi.onGet(ApiRoute.Products).reply(200, products);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchProductsAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchProductsAction.pending.type,
      fetchProductsAction.fulfilled.type,
    ]);
  });

  it('should set product to payload when GET /cameras/1', async () => {
    const store = mockStore();
    const products = getFakeProduct();

    mockApi.onGet(ApiRoute.Product.replace('{:cameraId}', '1')).reply(200, products);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchProductAction(1));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchProductAction.pending.type,
      fetchProductAction.fulfilled.type,
    ]);
  });

  it('should set similar products to payload when GET /cameras/1/similar', async () => {
    const store = mockStore();
    const products = getFakeProducts(5);

    mockApi.onGet(ApiRoute.SimilarProducts.replace('{:cameraId}', '1')).reply(200, products);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchSimilarProductsAction(1));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarProductsAction.pending.type,
      fetchSimilarProductsAction.fulfilled.type,
    ]);
  });

  it('should set promo product to payload when GET /cameras/1', async () => {
    const store = mockStore();
    const promo = getFakePromoProduct();

    mockApi.onGet(ApiRoute.Promo).reply(200, promo);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type,
    ]);
  });

  it('should set reviews to payload when GET /cameras/1/reviews', async () => {
    const store = mockStore();
    const reviews = getFakeRevews(5);

    mockApi
      .onGet(ApiRoute.Reviews.replace('{:cameraId}', '1'))
      .reply(200, reviews);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchReviewsAction(1));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });

  it('should get reviews when POST /cameras/1/reviews', async () => {
    const store = mockStore();
    const review = getFakeReview();
    const userReview = getFakeUserReview();

    mockApi
      .onPost(ApiRoute.PostReview)
      .reply(200, review);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(addReviewAction(userReview));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.fulfilled.type,
    ]);
  });

  it('should get discount when POST /coupons', async () => {
    const store = mockStore();
    const discount = 15;
    const promoCode = 'camera-333';

    mockApi.onPost(ApiRoute.PromoCode).reply(200, discount);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchPromoCodeAction(promoCode));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoCodeAction.pending.type,
      fetchPromoCodeAction.fulfilled.type,
    ]);
  });

  it('should send order when POST /orders', async () => {
    const store = mockStore();
    const order = getFakeOrder();

    mockApi.onPost(ApiRoute.Order).reply(201);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(makeOrderAction(order));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      makeOrderAction.pending.type,
      makeOrderAction.fulfilled.type,
    ]);
  });
});
