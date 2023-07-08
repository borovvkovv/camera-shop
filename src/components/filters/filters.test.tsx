import { render, screen } from '@testing-library/react';
import { FilterProductCategory, ProductLevel, ProductType } from '../../enums';
import { Filter } from '../../types/filter';
import { Sort } from '../../types/sort';
import { getFakeFilter, getFakeProducts, getFakeSort } from '../../utils/mock';
import Filters from './filters';

const onSubmit = jest.fn();
const products = getFakeProducts(5);
const setFilteringState = jest.fn();

describe('Component: Filters', () => {
  it('should render correctly', () => {
    const filter: Filter = {};
    const sort: Sort = {};

    const fakeApp = (
      <Filters
        filter={filter}
        onSubmit={onSubmit}
        products={products}
        setFilteringState={setFilteringState}
        sort={sort}
      />
    );
    render(fakeApp);

    expect(screen.getByText(/Цена/)).toBeInTheDocument();
    expect(screen.getByText(/Категория/)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/)).toBeInTheDocument();
    expect(screen.getByTestId('minPriceFilterInput')).toHaveValue(null);
    expect(screen.getByTestId('maxPriceFilterInput')).toHaveValue(null);

    Object.entries(FilterProductCategory).forEach(([key]) => {
      expect(
        screen.getByTestId(`categoryFilterInput-${key}`)
      ).not.toBeChecked();
    });
    Object.entries(ProductType).forEach(([key]) => {
      expect(screen.getByTestId(`typeFilterInput-${key}`)).not.toBeChecked();
    });
    Object.entries(ProductLevel).forEach(([key]) => {
      expect(screen.getByTestId(`levelFilterInput-${key}`)).not.toBeChecked();
    });
  });

  it('should fill filter', () => {
    const filter: Filter = getFakeFilter();
    const sort: Sort = getFakeSort();

    const fakeApp = (
      <Filters
        filter={filter}
        onSubmit={onSubmit}
        products={products}
        setFilteringState={setFilteringState}
        sort={sort}
      />
    );
    render(fakeApp);

    expect(screen.getByText(/Цена/)).toBeInTheDocument();
    expect(screen.getByText(/Категория/)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/)).toBeInTheDocument();
    expect(screen.getByTestId('minPriceFilterInput')).toHaveValue(filter.priceRange?.min);
    expect(screen.getByTestId('maxPriceFilterInput')).toHaveValue(filter.priceRange?.max);

    expect(
      screen.getByTestId(`categoryFilterInput-${filter.category ?? ''}`)
    ).toBeChecked();

    filter.type?.forEach((type) => {
      expect(screen.getByTestId(`typeFilterInput-${type}`)).toBeChecked();
    });

    filter.level?.forEach((level) => {
      expect(screen.getByTestId(`levelFilterInput-${level}`)).toBeChecked();
    });
  });
});
