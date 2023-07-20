import { AppProcess } from '../../types/store';
import { getFakePromoCodeInfo } from '../../utils/mock';
import { fetchPromoCodeAction, makeOrderAction } from '../api-actions';
import { appProcess } from './app-process';

describe('Reducer: AppProcess', () => {
  let state: AppProcess;
  beforeEach(() => {
    state = {
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

});
