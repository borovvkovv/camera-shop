import { renderHook } from '@testing-library/react';
import { getFakeProducts } from '../utils/mock';
import usePagination from './use-pagination';

describe('Hook: usePagination', () => {
  it('should return first page of products if given array is not empty', () => {
    const products = getFakeProducts(10);

    const { result } = renderHook(() => usePagination(products, 1));

    const { pagedProducts, currentPage, maxPageNumber } = result.current;
    expect(pagedProducts).toStrictEqual(products.splice(0, 9));
    expect(currentPage).toBe(1);
    expect(maxPageNumber).toBe(2);
  });

  it('should return only one page of reviews if given array is less than 9', () => {
    const products = getFakeProducts(1);

    const { result } = renderHook(() => usePagination(products, 1));

    const { pagedProducts, currentPage, maxPageNumber } = result.current;
    expect(pagedProducts).toStrictEqual(products);
    expect(currentPage).toBe(1);
    expect(maxPageNumber).toBe(1);
  });
});
