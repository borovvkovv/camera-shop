import { renderHook } from '@testing-library/react';
import { PRODUCTS_ON_SLIDER } from '../const';
import useSlider from './use-slider';

describe('Hook: useSlider', () => {
  it('should return first page of indexes if given array is not empty', () => {
    const productsLength = 4;
    const currentPage = 1;
    const expectedArray = Array.from({ length: productsLength }).map((_, index) => index).slice(
      0,
      PRODUCTS_ON_SLIDER
    );
    const expectedPages = Math.ceil(productsLength / PRODUCTS_ON_SLIDER);

    const { result } = renderHook(() => useSlider(productsLength, currentPage));

    const { currentPageIndexes, maxPageNumber } = result.current;
    expect(currentPageIndexes).toStrictEqual(expectedArray);
    expect(maxPageNumber).toBe(expectedPages);
  });

  it('should return only one page of reviews if given array is less than 3', () => {
    const productsLength = 1;
    const currentPage = 1;
    const expectedArray = Array.from({ length: productsLength })
      .map((_, index) => index)
      .slice(0, PRODUCTS_ON_SLIDER);
    const expectedPages = Math.ceil(productsLength / PRODUCTS_ON_SLIDER);

    const { result } = renderHook(() => useSlider(productsLength, currentPage));

    const { currentPageIndexes, maxPageNumber } = result.current;
    expect(currentPageIndexes).toStrictEqual(expectedArray);
    expect(maxPageNumber).toBe(expectedPages);
  });
});
