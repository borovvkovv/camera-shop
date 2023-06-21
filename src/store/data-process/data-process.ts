import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataProcess } from '../../types/store';
import { addReviewAction, fetchProductAction, fetchProductsAction, fetchPromoAction, fetchReviewsAction, fetchSimilarProductsAction } from '../api-actions';

const initialState: DataProcess = {
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

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsLoading = true;
        state.isProductsLoadingFailed = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isProductsLoading = false;
        state.isProductsLoadingFailed = true;
      })
      .addCase(fetchProductAction.pending, (state) => {
        state.isProductLoading = true;
        state.isCommentSent = false;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isProductLoading = false;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.isProductLoading = false;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoading = false;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoLoading = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addReviewAction.pending, (state) => {
        state.isCommentSending = true;
        state.isCommentSent = false;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.reviews = state.reviews.concat(action.payload);
        state.isCommentSending = false;
        state.isCommentSent = true;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.isCommentSending = false;
        state.isCommentSent = false;
      });
  },
});
