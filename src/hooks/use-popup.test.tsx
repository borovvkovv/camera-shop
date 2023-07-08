import { act, renderHook } from '@testing-library/react';
import usePopup from './use-popup';

const getNodeRef = () => ({
  current: document.createElement('ul'),
});

describe('Hook: usePopup', () => {
  it('should return param and function for popup visibility', () => {
    const { result } = renderHook(() => usePopup(getNodeRef()));

    const {isVisible: initialIsVisible, setVisibility} = result.current;

    expect(initialIsVisible).toBe(false);
    expect(setVisibility).toBeInstanceOf(Function);

    act(() => setVisibility(true));

    const {isVisible} = result.current;

    expect(isVisible).toBe(true);
  });
});
