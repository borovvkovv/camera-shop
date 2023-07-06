import { render, screen } from '@testing-library/react';
import { Filter } from '../../types/filter';
import { Sort } from '../../types/sort';
import { getFakeSort } from '../../utils/mock';
import Sorts from './sorts';

const setSearchParams = jest.fn();

describe('Component: Sorts', () => {
  it('should render correctly', () => {
    const filter: Filter = {};
    const sort: Sort = {};
    const fakeApp = (
      <Sorts
        filter={filter}
        sort={sort}
        setSearchParams={setSearchParams}
      />
    );

    render(fakeApp);

    expect(screen.getByText(/по цене/)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/)).toBeInTheDocument();

    expect(screen.getByTestId('sortByPrice')).toBeChecked();
    expect(screen.getByTestId('sortByPopularity')).not.toBeChecked();
    expect(screen.getByTestId('sortOrderAsc')).toBeChecked();
    expect(screen.getByTestId('sortOrderDesc')).not.toBeChecked();
  });

  it('should check sort parameters', () => {
    const filter: Filter = {};
    const sort: Sort = getFakeSort();
    const fakeApp = (
      <Sorts
        filter={filter}
        sort={sort}
        setSearchParams={setSearchParams}
      />
    );
    render(fakeApp);

    expect(screen.getByTestId(`sortBy${sort.by ?? ''}`)).toBeChecked();
    expect(screen.getByTestId(`sortOrder${sort.order ?? ''}`)).toBeChecked();
  });
});
