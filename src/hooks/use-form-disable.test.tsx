import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../const';
import useFormDisable from './use-form-disable';

const mockStore = configureMockStore();

describe('Hook: useFormDisable', () => {
  it('should return false when comment is not sending', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        isCommentSending: false,
      },
    });

    const { result } = renderHook(() => useFormDisable(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const isFormDisabled = result.current;

    expect(isFormDisabled).toBe(false);
  });

  it('should return true when comment is sending', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        isCommentSending: true,
      },
    });

    const { result } = renderHook(() => useFormDisable(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const isFormDisabled = result.current;

    expect(isFormDisabled).toBe(true);
  });
});
