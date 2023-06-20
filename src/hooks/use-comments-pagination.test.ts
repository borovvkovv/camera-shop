import { renderHook } from '@testing-library/react';
import { getFakeRevews } from '../utils/mock';
import useCommentsPagination from './use-comments-pagination';

describe('Hook: useCommentsPagination', () => {

  it('should return first page of reviews if given array is not empty', () => {

    const reviews = getFakeRevews(4);

    const { result } = renderHook(() => useCommentsPagination(reviews));

    const { pagedComments, currentPage, maxPageNumber } =
      result.current;
    expect(pagedComments).toStrictEqual(reviews.splice(0, 3));
    expect(currentPage).toBe(1);
    expect(maxPageNumber).toBe(2);
  });

  it('should return only one page of reviews if given array is less than 3', () => {
    const reviews = getFakeRevews(1);

    const { result } = renderHook(() => useCommentsPagination(reviews));

    const { pagedComments, currentPage, maxPageNumber } = result.current;
    expect(pagedComments).toStrictEqual(reviews);
    expect(currentPage).toBe(1);
    expect(maxPageNumber).toBe(1);
  });
});
