import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import Pagination from './pagination';

const history = createMemoryHistory();

describe('Component: Pagination', () => {
  it('should render button "Next" when page is first', () => {
    render(
      <HistoryRouter history={history}>
        <Pagination
          currentPage={1}
          maxPageNumber={5}
        />
      </HistoryRouter>
    );

    expect(screen.getByTestId('paginationNext')).toBeInTheDocument();
    expect(screen.queryByTestId('paginationPrevious')).not.toBeInTheDocument();
    expect(screen.getByTestId('page-1')).toHaveClass('pagination__link--active');
  });

  it('should render button "Pervious" when page is last', () => {
    render(
      <HistoryRouter history={history}>
        <Pagination
          currentPage={5}
          maxPageNumber={5}
        />
      </HistoryRouter>
    );

    expect(
      screen.queryByTestId('paginationNext')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('paginationPrevious')).toBeInTheDocument();
    expect(screen.getByTestId('page-5')).toHaveClass(
      'pagination__link--active'
    );
  });

  it('should render buttons "Pervious", "Next" when page is middle', () => {
    render(
      <HistoryRouter history={history}>
        <Pagination
          currentPage={3}
          maxPageNumber={5}
        />
      </HistoryRouter>
    );

    expect(screen.getByTestId('paginationNext')).toBeInTheDocument();
    expect(screen.getByTestId('paginationPrevious')).toBeInTheDocument();
    expect(screen.getByTestId('page-3')).toHaveClass(
      'pagination__link--active'
    );
  });
});

