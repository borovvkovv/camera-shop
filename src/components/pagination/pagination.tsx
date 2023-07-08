import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

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

  return (
    <div className='pagination'>
      <ul className='pagination__list'>
        {currentPage > 1 && (
          <li
            className='pagination__item'
            data-testid='paginationPrevious'
          >
            <Link
              className='pagination__link pagination__link--text'
              to={{
                pathname: `${AppRoute.Catalog.replace(
                  ':id',
                  `${currentPage - 1}`
                )}`,
                search: queryParams.toString(),
              }}
            >
              Назад
            </Link>
          </li>
        )}
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
                pathname: `${AppRoute.Catalog.replace(':id', `${index + 1}`)}`,
                search: queryParams.toString(),
              }}
              data-testid={`page-${index + 1}`}
            >
              {index + 1}
            </Link>
          </li>
        ))}
        {currentPage < maxPageNumber && (
          <li
            className='pagination__item'
            data-testid='paginationNext'
          >
            <Link
              className='pagination__link pagination__link--text'
              to={{
                pathname: `${AppRoute.Catalog.replace(
                  ':id',
                  `${currentPage + 1}`
                )}`,
                search: queryParams.toString(),
              }}
            >
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default memo(Pagination);
