import { useEffect, useMemo, useState } from 'react';
import { COMMENTS_ON_PAGE } from '../const';
import { Review } from '../types/review';

export default function useCommentsPagination(allComments: Review[]) {
  const [currentPage, setCurrentPage] = useState(1);

  function handleWindowsScroll() {
    let timerId: null | NodeJS.Timeout = null;
    let isLoadingActive = false;

    return () => {
      if (
        !isLoadingActive &&
        document.scrollingElement &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.scrollingElement?.scrollHeight - 10
      ) {
        isLoadingActive = true;
        timerId = setTimeout(() => {
          setCurrentPage((previous) => previous + 1);
          isLoadingActive = false;
        }, 1000);
      }else if (
        isLoadingActive &&
        timerId &&
        document.scrollingElement &&
        window.innerHeight + document.documentElement.scrollTop <
          document.scrollingElement?.scrollHeight
      ) {
        clearTimeout(timerId);
        isLoadingActive = false;
      }
    };
  }

  const pagedComments = useMemo(
    () => allComments.slice(0, currentPage * COMMENTS_ON_PAGE),
    [allComments, currentPage]
  );

  useEffect(() => {
    document.addEventListener('scroll', handleWindowsScroll());
  }, []);

  const maxPageNumber = Math.ceil(allComments.length / COMMENTS_ON_PAGE);

  return { pagedComments, setCurrentPage, currentPage, maxPageNumber };
}
