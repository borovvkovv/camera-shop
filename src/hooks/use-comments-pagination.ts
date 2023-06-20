import { useMemo, useState } from 'react';
import { COMMENTS_ON_PAGE } from '../const';
import { Review } from '../types/review';

export default function useCommentsPagination(
  allComments: Review[]
) {

  const [currentPage, setCurrentPage] = useState(1);

  const pagedComments = useMemo(
    () => allComments.slice(0, currentPage * COMMENTS_ON_PAGE),
    [allComments, currentPage]
  );

  const maxPageNumber = Math.ceil(allComments.length / COMMENTS_ON_PAGE);

  return { pagedComments, setCurrentPage, currentPage, maxPageNumber };
}
