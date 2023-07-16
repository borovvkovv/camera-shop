import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { BasketProduct } from '../../types/basket';
import { ProductCard } from '../../types/product-card';
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
  reducers: {
    incrementProduct: (state, action: PayloadAction<ProductCard>) => {
      const productToAdd = state.productsInBasket.find(
        (productItem) => productItem.product.id === action.payload.id
      );
      if (productToAdd) {
        ++productToAdd.quantity;
      } else {
        state.productsInBasket.push({ product: action.payload, quantity: 1 });
      }
    },
    dicrementProduct: (state, action: PayloadAction<ProductCard>) => {
      const productToRemove = state.productsInBasket.find(
        (productItem) => productItem.product.id === action.payload.id
      );
      if (productToRemove) {
        --productToRemove.quantity;
        if (productToRemove.quantity <= 0) {
          state.productsInBasket = state.productsInBasket.filter(
            (productInfo) => productInfo.product.id !== action.payload.id
          );
        }
      }
    },

    removeProduct: (state, action: PayloadAction<ProductCard>) => {
      const isProductInBasket = state.productsInBasket.some(
        (productItem) => productItem.product.id === action.payload.id
      );
      if (isProductInBasket) {
        state.productsInBasket = state.productsInBasket.filter(
          (productInfo) => productInfo.product.id !== action.payload.id
        );
      }
    },
    setProductAmount: (state, action: PayloadAction<BasketProduct>) => {
      const productToRemove = state.productsInBasket.find(
        (productItem) => productItem.product.id === action.payload.product.id
      );
      if (productToRemove) {
        if (action.payload.quantity <= 0) {
          state.productsInBasket = state.productsInBasket.filter(
            (productInfo) =>
              productInfo.product.id !== action.payload.product.id
          );
        } else {
          productToRemove.quantity = action.payload.quantity;
        }
      } else {
        state.productsInBasket.push(action.payload);
      }
    },
    emptyBasket: (state) => {
      if (state.productsInBasket.length > 0) {
        state.productsInBasket = [];
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

export const {
  incrementProduct,
  dicrementProduct,
  setProductAmount,
  removeProduct,
  emptyBasket,
} = appProcess.actions;
