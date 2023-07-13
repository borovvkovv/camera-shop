import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { BasketProduct } from '../../types/basket';
import { AppProcess } from '../../types/store';
import { fetchPromoCodeAction } from '../api-actions';

const initialState: AppProcess = {
  productsInBasket: [],
  promoCode: undefined,
  isPromoCodeChecked: false,
  isPromoCodeChecking: false,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<BasketProduct>) => {
      const productToAdd = state.productsInBasket.find(
        (productItem) => productItem === action.payload
      );
      if (productToAdd) {
        productToAdd.quantity += action.payload.quantity;
      } else {
        state.productsInBasket.push(action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<BasketProduct>) => {
      const productToRemove = state.productsInBasket.find(
        (productItem) => productItem === action.payload
      );
      if (productToRemove) {
        productToRemove.quantity -= action.payload.quantity;
        if (productToRemove.quantity <= 0) {
          state.productsInBasket = state.productsInBasket
            .slice(0, state.productsInBasket.indexOf(action.payload))
            .concat(
              state.productsInBasket.slice(
                state.productsInBasket.indexOf(action.payload) + 1
              )
            );
        }
      } else {
        state.productsInBasket.push(action.payload);
      }
    },
  },
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
      });
  }
});
