import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import Pagination from './pagination';

const history = createMemoryHistory();
const queryParams = new URLSearchParams();

describe('Component: Pagination', () => {
  it('should render button "Next" when page is first', () => {
    const currentPage = 1;
    const maxPageNumber = 5;
    render(
      <HistoryRouter history={history}>
        <Pagination
          currentPage={currentPage}
          maxPageNumber={maxPageNumber}
          queryParams={queryParams}
        />
      </HistoryRouter>
    );

    expect(screen.getByTestId('paginationNext')).toBeInTheDocument();
    expect(screen.queryByTestId('paginationPrevious')).not.toBeInTheDocument();
    expect(screen.getByTestId(`page-${currentPage}`)).toHaveClass(
      'pagination__link--active'
    );
  });

  it('should render button "Pervious" when page is last', () => {
    const currentPage = 5;
    const maxPageNumber = 5;
    render(
      <HistoryRouter history={history}>
        <Pagination
          currentPage={currentPage}
          maxPageNumber={maxPageNumber}
          queryParams={queryParams}
        />
      </HistoryRouter>
    );

    expect(
      screen.queryByTestId('paginationNext')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('paginationPrevious')).toBeInTheDocument();
    expect(screen.getByTestId(`page-${currentPage}`)).toHaveClass(
      'pagination__link--active'
    );
  });

  it('should render buttons "Pervious", "Next" when page is middle', () => {
    const currentPage = 3;
    const maxPageNumber = 5;
    render(
      <HistoryRouter history={history}>
        <Pagination
          currentPage={currentPage}
          maxPageNumber={maxPageNumber}
          queryParams={queryParams}
        />
      </HistoryRouter>
    );

    expect(screen.getByTestId('paginationNext')).toBeInTheDocument();
    expect(screen.getByTestId('paginationPrevious')).toBeInTheDocument();
    expect(screen.getByTestId(`page-${currentPage}`)).toHaveClass(
      'pagination__link--active'
    );
  });
});

