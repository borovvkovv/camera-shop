import { memo, useMemo } from 'react';
import { URLSearchParams } from 'url';
import { Filter } from '../../types/filter';
import { Sort, SortBy, SortOrder } from '../../types/sort';
import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom';
import { getQueryParams } from '../../utils';

type SortsProps = {
  filter: Filter;
  sort: Sort;
  setSearchParams: (
    nextInit?:
      | URLSearchParamsInit
      | ((previous: URLSearchParams) => URLSearchParamsInit),
    navigateOpts?: NavigateOptions
  ) => void;
};

function Sorts({ filter, setSearchParams, sort }: SortsProps): JSX.Element {
  const queryParams = useMemo(() => getQueryParams(filter, sort), [filter, sort]);

  function handleSortByPriceChange() {
    setSearchParams({
      ...queryParams,
      by: SortBy.Price,
    });
  }
  function handleSortByPopularityChange() {
    setSearchParams({
      ...queryParams,
      by: SortBy.Popularity,
    });
  }
  function handleSortOrderAscChange() {
    setSearchParams({
      ...queryParams,
      order: SortOrder.Asc,
    });
  }
  function handleSortOrderDescChange() {
    setSearchParams({
      ...queryParams,
      order: SortOrder.Desc,
    });
  }

  return (
    <form>
      <div className='catalog-sort__inner'>
        <p className='title title--h5'>Сортировать:</p>
        <div className='catalog-sort__type'>
          <div className='catalog-sort__btn-text'>
            <input
              type='radio'
              id='sortPrice'
              name='sort'
              checked={sort.by ? SortBy[sort.by] === SortBy.Price : false}
              onChange={handleSortByPriceChange}
              data-testid='sortByPrice'
            />
            <label htmlFor='sortPrice'>по цене</label>
          </div>
          <div className='catalog-sort__btn-text'>
            <input
              type='radio'
              id='sortPopular'
              name='sort'
              checked={sort.by ? SortBy[sort.by] === SortBy.Popularity : false}
              onChange={handleSortByPopularityChange}
              data-testid='sortByPopularity'
            />
            <label htmlFor='sortPopular'>по популярности</label>
          </div>
        </div>
        <div className='catalog-sort__order'>
          <div className='catalog-sort__btn catalog-sort__btn--up'>
            <input
              type='radio'
              id='up'
              name='sort-icon'
              checked={
                sort.order ? SortOrder[sort.order] === SortOrder.Asc : false
              }
              aria-label='По возрастанию'
              onChange={handleSortOrderAscChange}
              data-testid='sortOrderAsc'
            />
            <label htmlFor='up'>
              <svg
                width={16}
                height={14}
                aria-hidden='true'
              >
                <use xlinkHref='#icon-sort' />
              </svg>
            </label>
          </div>
          <div className='catalog-sort__btn catalog-sort__btn--down'>
            <input
              type='radio'
              id='down'
              name='sort-icon'
              aria-label='По убыванию'
              checked={
                sort.order ? SortOrder[sort.order] === SortOrder.Desc : false
              }
              onChange={handleSortOrderDescChange}
              data-testid='sortOrderDesc'
            />
            <label htmlFor='down'>
              <svg
                width={16}
                height={14}
                aria-hidden='true'
              >
                <use xlinkHref='#icon-sort' />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default memo(Sorts);
