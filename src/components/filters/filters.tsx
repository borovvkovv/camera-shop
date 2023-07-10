import { ChangeEvent, memo, MouseEvent, useEffect, useState } from 'react';
import {
  ProductCategoryToTriggerDisabling,
  ProductTypesToDisable,
} from '../../const';
import {
  FilterProductCategory,
  ProductLevel,
  ProductType,
  QueryParam,
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
    if (filter.category === ProductCategoryToTriggerDisabling) {
      setProductTypesToDisable(ProductTypesToDisable);
    } else {
      setProductTypesToDisable([]);
    }
    if (
      filter.category === ProductCategoryToTriggerDisabling &&
      filter.type?.some((typeItem) => ProductTypesToDisable.includes(typeItem))
    ) {
      const newQueryParams = {
        ...queryParams,
        type: queryParams[QueryParam.Type]
          ? queryParams[QueryParam.Type].filter(
            (typeItem) =>
              !ProductTypesToDisable.includes(
                typeItem as keyof typeof ProductType
              )
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
      [QueryParam.PriceMin]: evt.target.value === '' ? [] : [evt.target.value],
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
      [QueryParam.PriceMax]: evt.target.value === '' ? [] : [evt.target.value],
    };
    setQueryParams(newQueryParams);
    setFilteringState(true);
    setHandlerTimeout(
      setTimeout(() => {
        onSubmit(newQueryParams);
      }, 1000)
    );
  }

  function handleProductCategoryClick(evt: MouseEvent<HTMLInputElement>) {
    if (handlerTimeout) {
      clearTimeout(handlerTimeout);
    }

    if (
      queryParams[QueryParam.Category]?.includes(
        (evt.target as HTMLInputElement).value
      )
    ) {
      const newQueryParams = {
        ...queryParams,
        category: [],
      };
      setQueryParams(newQueryParams);
      setFilteringState(true);
      setHandlerTimeout(
        setTimeout(() => {
          onSubmit(newQueryParams);
        }, 1000)
      );
    } else if (
      (evt.target as HTMLInputElement).value ===
      ProductCategoryToTriggerDisabling
    ) {
      const newQueryParams = {
        ...queryParams,
        category: [(evt.target as HTMLInputElement).value],
        type: queryParams[QueryParam.Type]
          ? queryParams[QueryParam.Type].filter(
            (typeItem) =>
              !ProductTypesToDisable.includes(
                typeItem as keyof typeof ProductType
              )
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
    if (queryParams[QueryParam.Type]?.includes(selectedType)) {
      const newQueryParams = {
        ...queryParams,
        type: [
          ...queryParams[QueryParam.Type].slice(
            0,
            queryParams[QueryParam.Type].indexOf(selectedType)
          ),
          ...queryParams[QueryParam.Type].slice(
            queryParams[QueryParam.Type].indexOf(selectedType) + 1
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
        type: [...(queryParams[QueryParam.Type] ?? []), selectedTypeAsString],
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
    if (queryParams[QueryParam.Level]?.includes(selectedLevel)) {
      const newQueryParams = {
        ...queryParams,
        level: [
          ...queryParams[QueryParam.Level].slice(
            0,
            queryParams[QueryParam.Level].indexOf(selectedLevel)
          ),
          ...queryParams[QueryParam.Level].slice(
            queryParams[QueryParam.Level].indexOf(selectedLevel) + 1
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
          ...(queryParams[QueryParam.Level] ?? []),
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
                value={queryParams[QueryParam.PriceMin] ?? ''}
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
                value={queryParams[QueryParam.PriceMax] ?? ''}
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
                type='checkbox'
                name='category'
                onChange={() => void 0}
                value={key}
                checked={
                  queryParams[QueryParam.Category]?.length > 0
                    ? FilterProductCategory[
                        String(
                          queryParams[QueryParam.Category]
                        ) as keyof typeof FilterProductCategory
                    ] === value
                    : false
                }
                onClick={handleProductCategoryClick}
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
                  queryParams[QueryParam.Type]
                    ? queryParams[QueryParam.Type]
                      .map(
                        (typeItem) =>
                          ProductType[typeItem as keyof typeof ProductType]
                      )
                      .includes(value)
                    : false
                }
                disabled={productTypesToDisable
                  .map((typeToDisable) => ProductType[typeToDisable])
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
                  queryParams[QueryParam.Level]
                    ? queryParams[QueryParam.Level]
                      .map(
                        (levelItem) =>
                          ProductLevel[levelItem as keyof typeof ProductLevel]
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
