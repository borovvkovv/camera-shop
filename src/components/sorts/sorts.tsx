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
              checked={SortBy[sort.by ?? SortBy.Price] === SortBy.Price}
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
              checked={SortBy[sort.by ?? SortBy.Price] === SortBy.Popularity}
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
              checked={SortOrder[sort.order ?? SortOrder.Asc] === SortOrder.Asc}
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
                SortOrder[sort.order ?? SortOrder.Asc] === SortOrder.Desc
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
