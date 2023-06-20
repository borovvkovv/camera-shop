import { renderHook } from '@testing-library/react';
import useSlider from './use-slider';

describe('Hook: useSlider', () => {
  it('should return first page of indexes if given array is not empty', () => {
    const productsLength = 4;
    const currentPage = 1;

    const { result } = renderHook(() => useSlider(productsLength, currentPage));

    const { currentPageIndexes, maxPageNumber } = result.current;
    expect(currentPageIndexes).toStrictEqual([0,1,2]);
    expect(maxPageNumber).toBe(2);
  });

  it('should return only one page of reviews if given array is less than 3', () => {
    const productsLength = 1;
    const currentPage = 1;

    const { result } = renderHook(() => useSlider(productsLength, currentPage));

    const { currentPageIndexes, maxPageNumber } = result.current;
    expect(currentPageIndexes).toStrictEqual([0]);
    expect(maxPageNumber).toBe(1);
  });
});
