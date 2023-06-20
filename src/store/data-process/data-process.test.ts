import { DataProcess } from '../../types/store';
import {
  dataProcess,
} from './data-process';
import { getFakeProduct, getFakeProducts, getFakePromoProduct, getFakeRevews, getFakeReview } from '../../utils/mock';
import {
  addReviewAction,
  fetchProductAction,
  fetchProductsAction,
  fetchPromoAction,
  fetchReviewsAction,
  fetchSimilarProductsAction,
} from '../api-actions';

describe('Reducer: DataProcess', () => {
  let state: DataProcess;
  beforeEach(() => {
    state = {
      products: [],
      isProductsLoading: true,
      isProductsLoadingFailed: false,
      product: null,
      isProductLoading: true,
      similarProducts: [],
      promo: null,
      isPromoLoading: true,
      reviews: [],
      isCommentSending: false,
      isCommentSent: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  it('should update isProductsLoading to "true", isProductsLoadingFailed to "false" if fetchProductsAction pending', () => {
    expect(
      dataProcess.reducer(state, {
        type: fetchProductsAction.pending.type,
      })
    ).toEqual({
      ...state,
      isProductsLoading: true,
      isProductsLoadingFailed: false,
    });
  });

  it('should update isProductsLoading to "false" if fetchProductsAction fulfilled', () => {
    const products = getFakeProducts(5);
    expect(
      dataProcess.reducer(state, {
        type: fetchProductsAction.fulfilled.type,
        payload: products,
      })
    ).toEqual({
      ...state,
      isProductsLoading: false,
      products,
    });
  });

  it('should update isProductsLoading to "false", isProductsLoadingFailed to "true" if fetchProductsAction rejected', () => {
    expect(
      dataProcess.reducer(state, {
        type: fetchProductsAction.rejected.type,
      })
    ).toEqual({
      ...state,
      isProductsLoading: false,
      isProductsLoadingFailed: true,
    });
  });

  it('should update isProductLoading to "true", isCommentSent to "false" if fetchProductAction pending', () => {
    expect(
      dataProcess.reducer(state, {
        type: fetchProductAction.pending.type,
      })
    ).toEqual({
      ...state,
      isProductLoading: true,
      isCommentSent: false,
    });
  });

  it('should update isProductLoading to "false" and products to given payload if fetchProductAction fulfilled', () => {
    const product = getFakeProduct();
    expect(
      dataProcess.reducer(state, {
        type: fetchProductAction.fulfilled.type,
        payload: product,
      })
    ).toEqual({
      ...state,
      isProductLoading: false,
      product,
    });
  });

  it('should update isProductLoading to "false" if fetchProductAction rejected', () => {
    expect(
      dataProcess.reducer(state, {
        type: fetchProductAction.rejected.type,
      })
    ).toEqual({
      ...state,
      isProductLoading: false,
    });
  });

  it('should update similar products to given payload if fetchSimilarProductsAction fulfilled', () => {
    const similarProducts = getFakeProducts(5);
    expect(
      dataProcess.reducer(state, {
        type: fetchSimilarProductsAction.fulfilled.type,
        payload: similarProducts,
      })
    ).toEqual({
      ...state,
      similarProducts,
    });
  });

  it('should update isPromoLoading to "true" if fetchPromoAction pending', () => {
    expect(
      dataProcess.reducer(state, {
        type: fetchPromoAction.pending.type,
      })
    ).toEqual({
      ...state,
      isPromoLoading: true,
    });
  });

  it('should update isPromoLoading to "false" and promo product to given payload if fetchPromoAction fulfilled', () => {
    const promoProduct = getFakePromoProduct();
    expect(
      dataProcess.reducer(state, {
        type: fetchPromoAction.fulfilled.type,
        payload: promoProduct,
      })
    ).toEqual({
      ...state,
      isPromoLoading: false,
      promo: promoProduct,
    });
  });

  it('should update isPromoLoading to "false" if fetchPromoAction rejected', () => {
    expect(
      dataProcess.reducer(state, {
        type: fetchPromoAction.rejected.type,
      })
    ).toEqual({
      ...state,
      isPromoLoading: false,
    });
  });

  it('should update reviews to given payload if fetchReviewsAction fulfilled', () => {
    const reviews = getFakeRevews(5);
    expect(
      dataProcess.reducer(state, {
        type: fetchReviewsAction.fulfilled.type,
        payload: reviews,
      })
    ).toEqual({
      ...state,
      reviews,
    });
  });

  it('should update isCommentSending to "true", isCommentSent to "false" if addReviewAction pending', () => {
    expect(
      dataProcess.reducer(state, {
        type: addReviewAction.pending.type,
      })
    ).toEqual({
      ...state,
      isCommentSending: true,
      isCommentSent: false,
    });
  });

  it('should update isCommentSending to "false", isCommentSent to "true" and review to given payload if addReviewAction fulfilled', () => {
    const review = getFakeReview();

    expect(
      dataProcess.reducer(state, {
        type: addReviewAction.fulfilled.type,
        payload: review,
      })
    ).toEqual({
      ...state,
      isCommentSending: false,
      isCommentSent: true,
      reviews: [review],
    });
  });

  it('should update isCommentSending to "false", isCommentSent to "false" if addReviewAction rejected', () => {
    expect(
      dataProcess.reducer(state, {
        type: addReviewAction.rejected.type,
      })
    ).toEqual({
      ...state,
      isCommentSending: false,
      isCommentSent: false,
    });
  });

});
