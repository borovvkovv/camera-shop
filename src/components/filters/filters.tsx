import { ChangeEvent, memo, useEffect, useState } from 'react';
import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom';
import { URLSearchParams } from 'url';
import { FilterProductCategory, ProductLevel, ProductType } from '../../enums';
import { Filter } from '../../types/filter';
import { ProductCard } from '../../types/product-card';
import { Sort } from '../../types/sort';
import { getMaxPrice, getMinPrice, getQueryParams } from '../../utils';

type FilterProps = {
  filter: Filter;
  sort: Sort;
  setSearchParams: (
    nextInit?:
      | URLSearchParamsInit
      | ((prev: URLSearchParams) => URLSearchParamsInit),
    navigateOpts?: NavigateOptions
  ) => void;
  products: ProductCard[];
  onSubmit: (queryParams: Record<string, string[]>) => void;
  setFilteringState: React.Dispatch<React.SetStateAction<boolean>>;
};

function Filters({
  filter,
  sort,
  setSearchParams,
  products,
  onSubmit,
  setFilteringState,
}: FilterProps): JSX.Element {
  const minPrice = getMinPrice(products);
  const maxPrice = getMaxPrice(products);

  const [queryParams, setQueryParams] = useState(getQueryParams(filter, sort));
  useEffect(() => {
    setQueryParams(getQueryParams(filter, sort));
  }, [filter, sort]);

  const [handlerTimeout, setHandlerTimeout] = useState<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  const [productTypesToDisable, setProductTypesToDisable] = useState<
    (keyof typeof ProductType)[]
  >([]);

  function handlePriceMinChange(evt: ChangeEvent<HTMLInputElement>) {
    if (handlerTimeout) {
      clearTimeout(handlerTimeout);
    }
    const newQueryParams = {
      ...queryParams,
      price_gte: evt.target.value === '' ? [] : [evt.target.value],
    };
    setQueryParams(newQueryParams);
    setFilteringState(true);
    const timeoutId = setTimeout(() => {
      onSubmit(newQueryParams);
    }, 1000);
    setHandlerTimeout(timeoutId);
  }

  function handlePriceMaxChange(evt: ChangeEvent<HTMLInputElement>) {
    if (handlerTimeout) {
      clearTimeout(handlerTimeout);
    }
    const newQueryParams = {
      ...queryParams,
      price_lte: evt.target.value === '' ? [] : [evt.target.value],
    };
    setQueryParams(newQueryParams);
    setFilteringState(true);
    setHandlerTimeout(
      setTimeout(() => {
        onSubmit(newQueryParams);
      }, 1000)
    );
  }

  function handleProductCategoryChange(evt: ChangeEvent<HTMLInputElement>) {
    if (handlerTimeout) {
      clearTimeout(handlerTimeout);
    }

    if ((evt.target as HTMLInputElement).value === 'Video') {
      setProductTypesToDisable(['Instant', 'Film']);
      const newQueryParams = {
        ...queryParams,
        category: [(evt.target as HTMLInputElement).value],
        type: queryParams['type']
          ? queryParams['type'].filter((x) => x !== 'Instant' && x !== 'Film')
          : [],
      };
      setQueryParams(newQueryParams);
      setFilteringState(true);
      const timeoutId = setTimeout(() => {
        onSubmit(newQueryParams);
      }, 1000);
      setHandlerTimeout(timeoutId);
    } else {
      setProductTypesToDisable([]);
      const newQueryParams = {
        ...queryParams,
        category: [(evt.target as HTMLInputElement).value],
      };
      setQueryParams(newQueryParams);
      setFilteringState(true);
      const timeoutId = setTimeout(() => {
        onSubmit(newQueryParams);
      }, 1000);
      setHandlerTimeout(timeoutId);
    }
  }

  function handleProductTypeChange(evt: ChangeEvent<HTMLInputElement>) {
    const selectedTypeAsString = (evt.target as HTMLInputElement).value;
    const selectedType = selectedTypeAsString as keyof typeof ProductType;
    if (handlerTimeout) {
      clearTimeout(handlerTimeout);
    }
    if (queryParams['type']?.includes(selectedType)) {
      const newQueryParams = {
        ...queryParams,
        type: [
          ...queryParams['type'].slice(
            0,
            queryParams['type'].indexOf(selectedType)
          ),
          ...queryParams['type'].slice(
            queryParams['type'].indexOf(selectedType) + 1
          ),
        ],
      };
      setQueryParams((prev) => newQueryParams);
      setFilteringState(true);
      setHandlerTimeout(
        setTimeout(() => {
          onSubmit(newQueryParams);
        }, 1000)
      );
    } else {
      const newQueryParams = {
        ...queryParams,
        type: [...(queryParams['type'] ?? []), selectedTypeAsString],
      };
      setQueryParams(newQueryParams);
      setFilteringState(true);
      setHandlerTimeout(
        setTimeout(() => {
          onSubmit(newQueryParams);
        }, 1000)
      );
    }
  }

  function handleProductLevelChange(evt: ChangeEvent<HTMLInputElement>) {
    const selectedLevelAsString = (evt.target as HTMLInputElement).value;
    const selectedLevel = selectedLevelAsString as keyof typeof ProductLevel;
    if (handlerTimeout) {
      clearTimeout(handlerTimeout);
    }
    if (queryParams['level']?.includes(selectedLevel)) {
      const newQueryParams = {
        ...queryParams,
        level: [
          ...queryParams['level'].slice(
            0,
            queryParams['level'].indexOf(selectedLevel)
          ),
          ...queryParams['level'].slice(
            queryParams['level'].indexOf(selectedLevel) + 1
          ),
        ],
      };
      setQueryParams(newQueryParams);
      setFilteringState(true);
      setHandlerTimeout(
        setTimeout(() => {
          onSubmit(newQueryParams);
        }, 1000)
      );
    } else {
      const newQueryParams = {
        ...queryParams,
        level: [...(queryParams['level'] ?? []), selectedLevelAsString],
      };
      setQueryParams(newQueryParams);
      setFilteringState(true);
      setHandlerTimeout(
        setTimeout(() => {
          onSubmit(newQueryParams);
        }, 1000)
      );
    }
  }

  function handleResetButtonClick() {
    setQueryParams({});
    onSubmit({});
  }

  return (
    <form>
      <h2 className='visually-hidden'>Фильтр</h2>
      <fieldset className='catalog-filter__block'>
        <legend className='title title--h5'>Цена, ₽</legend>
        <div className='catalog-filter__price-range'>
          <div className='custom-input'>
            <label>
              <input
                type='number'
                name='price'
                placeholder={isNaN(minPrice) ? 'от' : String(minPrice)}
                value={queryParams['price_gte'] ?? ''}
                onChange={handlePriceMinChange}
              />
            </label>
          </div>
          <div className='custom-input'>
            <label>
              <input
                type='number'
                name='priceUp'
                placeholder={isNaN(maxPrice) ? 'до' : String(maxPrice)}
                value={queryParams['price_lte'] ?? ''}
                onChange={handlePriceMaxChange}
              />
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className='catalog-filter__block'>
        <legend className='title title--h5'>Категория</legend>
        {Object.entries(FilterProductCategory).map(([key, value]) => (
          <div
            className='custom-checkbox catalog-filter__item'
            key={key}
          >
            <label>
              <input
                type='radio'
                name='category'
                onChange={handleProductCategoryChange}
                value={key}
                checked={
                  queryParams['category']?.length > 0
                    ? FilterProductCategory[
                        String(
                          queryParams['category']
                        ) as keyof typeof FilterProductCategory
                      ] === value
                    : false
                }
              />
              <span className='custom-checkbox__icon' />
              <span className='custom-checkbox__label'>{value}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset className='catalog-filter__block'>
        <legend className='title title--h5'>Тип камеры</legend>
        {Object.entries(ProductType).map(([key, value]) => (
          <div
            className='custom-checkbox catalog-filter__item'
            key={key}
          >
            <label>
              <input
                type='checkbox'
                name={key.toLowerCase()}
                onChange={handleProductTypeChange}
                value={key}
                checked={
                  queryParams['type']
                    ? queryParams['type']
                        .map((t) => ProductType[t as keyof typeof ProductType])
                        .includes(value)
                    : false
                }
                disabled={productTypesToDisable
                  .map((t) => ProductType[t])
                  .includes(value)}
              />
              <span className='custom-checkbox__icon' />
              <span className='custom-checkbox__label'>{value}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset className='catalog-filter__block'>
        <legend className='title title--h5'>Уровень</legend>
        {Object.entries(ProductLevel).map(([key, value]) => (
          <div
            className='custom-checkbox catalog-filter__item'
            key={key}
          >
            <label>
              <input
                type='checkbox'
                name={key.toLowerCase()}
                onChange={handleProductLevelChange}
                value={key}
                checked={
                  queryParams['level']
                    ? queryParams['level']
                        .map(
                          (t) => ProductLevel[t as keyof typeof ProductLevel]
                        )
                        .includes(value)
                    : false
                }
              />
              <span className='custom-checkbox__icon' />
              <span className='custom-checkbox__label'>{value}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <button
        className='btn catalog-filter__reset-btn'
        type='reset'
        onClick={handleResetButtonClick}
      >
        Сбросить фильтры
      </button>
    </form>
  );
}

export default memo(Filters);
