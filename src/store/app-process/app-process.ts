import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppProcess } from '../../types/store';
import { fetchPromoCodeAction, makeOrderAction } from '../api-actions';

const initialState: AppProcess = {
  productsInBasket: [],
  promoCode: undefined,
  isPromoCodeChecked: false,
  isPromoCodeChecking: false,
  isOrderSentSuccessfully: false,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoCodeAction.pending, (state) => {
        state.isPromoCodeChecking = true;
        state.isPromoCodeChecked = false;
        state.promoCode = undefined;
      })
      .addCase(fetchPromoCodeAction.fulfilled, (state, action) => {
        state.isPromoCodeChecking = false;
        state.promoCode = action.payload;
      })
      .addCase(fetchPromoCodeAction.rejected, (state) => {
        state.isPromoCodeChecking = false;
        state.isPromoCodeChecked = true;
      })
      .addCase(makeOrderAction.pending, (state) => {
        state.isOrderSentSuccessfully = false;
      })
      .addCase(makeOrderAction.fulfilled, (state) => {
        state.isOrderSentSuccessfully = true;
      })
      .addCase(makeOrderAction.rejected, (state) => {
        state.isOrderSentSuccessfully = false;
      });
  },
});
