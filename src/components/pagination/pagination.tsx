import { memo } from 'react';
import { Link } from 'react-router-dom';
import { getCatalogUrl } from '../../utils';

type PaginationProps = {
  currentPage: number;
  maxPageNumber: number;
  queryParams: URLSearchParams;
};

function Pagination({
  currentPage,
  maxPageNumber,
  queryParams,
}: PaginationProps): JSX.Element | null {

  if (maxPageNumber <= 1) {
    return null;
  }

  let backPageElement: JSX.Element | null = null;
  if (currentPage > 1) {
    backPageElement = (
      <li
        className='pagination__item'
        data-testid='paginationPrevious'
      >
        <Link
          className='pagination__link pagination__link--text'
          to={{
            pathname: getCatalogUrl(currentPage - 1),
            search: queryParams.toString(),
          }}
        >
          Назад
        </Link>
      </li>
    );
  }

  let forwardPageElement: JSX.Element | null = null;
  if (currentPage < maxPageNumber) {
    forwardPageElement = (
      <li
        className='pagination__item'
        data-testid='paginationNext'
      >
        <Link
          className='pagination__link pagination__link--text'
          to={{
            pathname: getCatalogUrl(currentPage + 1),
            search: queryParams.toString(),
          }}
        >
          Далее
        </Link>
      </li>
    );
  }

  return (
    <div className='pagination'>
      <ul className='pagination__list'>
        {backPageElement}
        {Array.from({ length: maxPageNumber }).map((_, index) => (
          <li
            className='pagination__item'
            key={`page_${index + 1}`}
          >
            <Link
              className={`pagination__link ${
                index + 1 === currentPage ? 'pagination__link--active' : ''
              }`}
              to={{
                pathname: getCatalogUrl(index + 1),
                search: queryParams.toString(),
              }}
              data-testid={`page-${index + 1}`}
            >
              {index + 1}
            </Link>
          </li>
        ))}
        {forwardPageElement}
      </ul>
    </div>
  );
}

export default memo(Pagination);
