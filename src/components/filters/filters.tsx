import { ChangeEvent, memo, useEffect, useState } from 'react';
import {
  FilterProductCategory,
  ProductLevel,
  ProductType,
  QueryParams,
} from '../../enums';
import { Filter } from '../../types/filter';
import { ProductCard } from '../../types/product-card';
import { Sort } from '../../types/sort';
import { getMaxPrice, getMinPrice, getQueryParams } from '../../utils';

type FilterProps = {
  filter: Filter;
  sort: Sort;
  products: ProductCard[];
  onSubmit: (queryParams: Record<string, string[]>) => void;
  setFilteringState: React.Dispatch<React.SetStateAction<boolean>>;
};

function Filters({
  filter,
  sort,
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
    (keyof typeof ProductType)[]>([]);
  useEffect(() => {
    if (filter.category === 'Video') {
      setProductTypesToDisable(['Instant', 'Film']);
    }
    else {
      setProductTypesToDisable([]);
    }
    if (
      filter.category === 'Video' &&
      (filter.type?.includes('Instant') || filter.type?.includes('Film'))
    ) {
      const newQueryParams = {
        ...queryParams,
        type: queryParams[QueryParams.Type]
          ? queryParams[QueryParams.Type].filter(
            (x) => x !== 'Instant' && x !== 'Film'
          )
          : [],
      };
      setQueryParams(newQueryParams);
      setFilteringState(true);
      onSubmit(newQueryParams);
    }
  }, [filter.category, filter.type, onSubmit, queryParams, setFilteringState]);

  function handlePriceMinChange(evt: ChangeEvent<HTMLInputElement>) {
    if (handlerTimeout) {
      clearTimeout(handlerTimeout);
    }
    const newQueryParams = {
      ...queryParams,
      [QueryParams.PriceMin]: evt.target.value === '' ? [] : [evt.target.value],
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
      [QueryParams.PriceMax]: evt.target.value === '' ? [] : [evt.target.value],
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
      const newQueryParams = {
        ...queryParams,
        category: [(evt.target as HTMLInputElement).value],
        type: queryParams[QueryParams.Type]
          ? queryParams[QueryParams.Type].filter(
            (x) => x !== 'Instant' && x !== 'Film'
          )
          : [],
      };
      setQueryParams(newQueryParams);
      setFilteringState(true);
      const timeoutId = setTimeout(() => {
        onSubmit(newQueryParams);
      }, 1000);
      setHandlerTimeout(timeoutId);
    } else {
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
    if (queryParams[QueryParams.Type]?.includes(selectedType)) {
      const newQueryParams = {
        ...queryParams,
        type: [
          ...queryParams[QueryParams.Type].slice(
            0,
            queryParams[QueryParams.Type].indexOf(selectedType)
          ),
          ...queryParams[QueryParams.Type].slice(
            queryParams[QueryParams.Type].indexOf(selectedType) + 1
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
        type: [...(queryParams[QueryParams.Type] ?? []), selectedTypeAsString],
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
    if (queryParams[QueryParams.Level]?.includes(selectedLevel)) {
      const newQueryParams = {
        ...queryParams,
        level: [
          ...queryParams[QueryParams.Level].slice(
            0,
            queryParams[QueryParams.Level].indexOf(selectedLevel)
          ),
          ...queryParams[QueryParams.Level].slice(
            queryParams[QueryParams.Level].indexOf(selectedLevel) + 1
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
        level: [
          ...(queryParams[QueryParams.Level] ?? []),
          selectedLevelAsString,
        ],
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
                value={queryParams[QueryParams.PriceMin] ?? ''}
                onChange={handlePriceMinChange}
                data-testid='minPriceFilterInput'
              />
            </label>
          </div>
          <div className='custom-input'>
            <label>
              <input
                type='number'
                name='priceUp'
                placeholder={isNaN(maxPrice) ? 'до' : String(maxPrice)}
                value={queryParams[QueryParams.PriceMax] ?? ''}
                onChange={handlePriceMaxChange}
                data-testid='maxPriceFilterInput'
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
                  queryParams[QueryParams.Category]?.length > 0
                    ? FilterProductCategory[
                        String(
                          queryParams[QueryParams.Category]
                        ) as keyof typeof FilterProductCategory
                    ] === value
                    : false
                }
                data-testid={`categoryFilterInput-${key}`}
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
                  queryParams[QueryParams.Type]
                    ? queryParams[QueryParams.Type]
                      .map((t) => ProductType[t as keyof typeof ProductType])
                      .includes(value)
                    : false
                }
                disabled={productTypesToDisable
                  .map((t) => ProductType[t])
                  .includes(value)}
                data-testid={`typeFilterInput-${key}`}
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
                  queryParams[QueryParams.Level]
                    ? queryParams[QueryParams.Level]
                      .map(
                        (t) => ProductLevel[t as keyof typeof ProductLevel]
                      )
                      .includes(value)
                    : false
                }
                data-testid={`levelFilterInput-${key}`}
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
