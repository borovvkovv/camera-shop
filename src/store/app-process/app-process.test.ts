import { BasketProduct } from '../../types/basket';
import { AppProcess } from '../../types/store';
import { getFakeProduct, getFakePromoCodeInfo } from '../../utils/mock';
import { fetchPromoCodeAction, makeOrderAction } from '../api-actions';
import {
  appProcess,
  dicrementProduct,
  emptyBasket,
  incrementProduct,
  removeProduct,
  setProductAmount,
} from './app-process';

describe('Reducer: AppProcess', () => {
  let state: AppProcess;
  beforeEach(() => {
    state = {
      productsInBasket: [],
      promoCode: undefined,
      isPromoCodeChecked: false,
      isPromoCodeChecking: false,
      isOrderSentSuccessfully: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  it('should update isPromoCodeChecking to "true", isPromoCodeChecked to "false", promoCode to "undefined" if fetchPromoCodeAction pending', () => {
    expect(
      appProcess.reducer(state, {
        type: fetchPromoCodeAction.pending.type,
      })
    ).toEqual({
      ...state,
      promoCode: undefined,
      isPromoCodeChecked: false,
      isPromoCodeChecking: true,
    });
  });

  it('should update isPromoCodeChecking to "false", promoCode to given payload if fetchPromoCodeAction fulfilled', () => {
    const promoCodeInfo = getFakePromoCodeInfo();
    expect(
      appProcess.reducer(state, {
        type: fetchPromoCodeAction.fulfilled.type,
        payload: promoCodeInfo,
      })
    ).toEqual({
      ...state,
      promoCode: promoCodeInfo,
      isPromoCodeChecking: false,
    });
  });

  it('should update isPromoCodeChecking to "false", isPromoCodeChecked to "true" if fetchPromoCodeAction rejected', () => {
    const promoCodeInfo = getFakePromoCodeInfo();
    expect(
      appProcess.reducer(state, {
        type: fetchPromoCodeAction.rejected.type,
        payload: promoCodeInfo,
      })
    ).toEqual({
      ...state,
      isPromoCodeChecking: false,
      isPromoCodeChecked: true,
    });
  });

  it('should update isOrderSentSuccessfully to "false" if makeOrderAction pending', () => {
    expect(
      appProcess.reducer(state, {
        type: makeOrderAction.pending.type,
      })
    ).toEqual({
      ...state,
      isOrderSentSuccessfully: false,
    });
  });

  it('should update isOrderSentSuccessfully to "true" if makeOrderAction fulfilled', () => {
    expect(
      appProcess.reducer(state, {
        type: makeOrderAction.fulfilled.type,
      })
    ).toEqual({
      ...state,
      isOrderSentSuccessfully: true,
    });
  });

  it('should update isOrderSentSuccessfully to "false" if makeOrderAction rejected', () => {
    expect(
      appProcess.reducer(state, {
        type: makeOrderAction.rejected.type,
      })
    ).toEqual({
      ...state,
      isOrderSentSuccessfully: false,
    });
  });

  it('should add increment/add product to productsInBasket if incrementProduct', () => {
    const productCard = getFakeProduct();
    const expectedProductsInBasket: BasketProduct[] = [
      {
        product: productCard,
        quantity: 1,
      },
    ];

    expect(
      appProcess.reducer(state, {
        type: incrementProduct.type,
        payload: productCard,
      })
    ).toEqual({
      ...state,
      productsInBasket: expectedProductsInBasket,
    });
  });

  it('should add dicrement/remove product from productsInBasket if dicrementProduct', () => {
    const productCard = getFakeProduct();
    const productsInBasket: BasketProduct[] = [
      {
        product: productCard,
        quantity: 2,
      },
    ];
    const expectedProductsInBasket: BasketProduct[] = [
      {
        product: productCard,
        quantity: productsInBasket[0].quantity - 1,
      },
    ];
    state = {
      ...state,
      productsInBasket,
    };

    expect(
      appProcess.reducer(state, {
        type: dicrementProduct.type,
        payload: productCard,
      })
    ).toEqual({
      ...state,
      productsInBasket: expectedProductsInBasket,
    });
  });

  it('should remove product from productsInBasket if removeProduct', () => {
    const productCard = getFakeProduct();
    const productsInBasket: BasketProduct[] = [
      {
        product: productCard,
        quantity: 2,
      },
    ];
    state = {
      ...state,
      productsInBasket,
    };

    expect(
      appProcess.reducer(state, {
        type: removeProduct.type,
        payload: productCard,
      })
    ).toEqual({
      ...state,
      productsInBasket: [],
    });
  });

  it('should set product amount if setProductAmount', () => {
    const productCard = getFakeProduct();
    const productsInBasket: BasketProduct[] = [
      {
        product: productCard,
        quantity: 2,
      },
    ];
    const expectedProductInBasket: BasketProduct = {
      product: productCard,
      quantity: 5,
    };
    state = {
      ...state,
      productsInBasket,
    };

    expect(
      appProcess.reducer(state, {
        type: setProductAmount.type,
        payload: expectedProductInBasket,
      })
    ).toEqual({
      ...state,
      productsInBasket: [expectedProductInBasket],
    });
  });

  it('should empty basket if emptyBasket', () => {
    const productCard = getFakeProduct();
    const productsInBasket: BasketProduct[] = [
      {
        product: productCard,
        quantity: 2,
      },
    ];
    state = {
      ...state,
      productsInBasket,
    };

    expect(
      appProcess.reducer(state, {
        type: emptyBasket.type,
      })
    ).toEqual({
      ...state,
      productsInBasket: [],
    });
  });
});
