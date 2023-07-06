import { renderHook } from '@testing-library/react';
import { MutableRefObject } from 'react';
import useSearchForm from './use-search-form';

describe('Hook: useSearchForm', () => {
  it('should return correct initial state', () => {
    const ref = { current: null } as MutableRefObject<null>;

    const { result } = renderHook(() => useSearchForm(ref));

    const {
      isFormSearchOpened,
      searchPattern,
    } = result.current;

    expect(isFormSearchOpened).toBe(false);
    expect(searchPattern).toBe('');
  });
});
