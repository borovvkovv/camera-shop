import { act, renderHook } from '@testing-library/react';
import usePopup from './use-popup';

const getNodeRef = () => ({
  current: document.createElement('ul'),
});

describe('Hook: usePopupList', () => {
  it('should return array with 2 elements and attach event listeners when isSortOptionsOpen=true', () => {
    const { result } = renderHook(() => usePopup(getNodeRef()));

    const {isVisible: initialIsVisible, setVisibility} = result.current;

    expect(initialIsVisible).toBe(false);
    expect(setVisibility).toBeInstanceOf(Function);

    act(() => setVisibility(true));

    const {isVisible} = result.current;

    expect(isVisible).toBe(true);
  });
});
