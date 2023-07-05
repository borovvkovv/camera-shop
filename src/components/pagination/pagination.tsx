import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Filter } from '../../types/filter';
import { Sort } from '../../types/sort';
import { getQueryParams, getStringFromQueryParams } from '../../utils';

type PaginationProps = {
  currentPage: number;
  maxPageNumber: number;
  filter: Filter;
  sort: Sort;
};

function Pagination({
  currentPage,
  maxPageNumber,
  filter,
  sort,
}: PaginationProps): JSX.Element | null {

  const queryParams = useMemo(
    () => getQueryParams(filter, sort),
    [filter, sort]
  );

  if (maxPageNumber < 2) {
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
                search: getStringFromQueryParams(queryParams),
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
                search: getStringFromQueryParams(queryParams),
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
                search: getStringFromQueryParams(queryParams),
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
