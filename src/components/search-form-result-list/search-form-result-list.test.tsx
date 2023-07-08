import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import SearchFormResultList from './search-form-result-list';
import { getFakeSearchResultProducts } from '../../utils/mock';

const history = createMemoryHistory();
const searchResultProducts = getFakeSearchResultProducts(5);
const onClick = jest.fn();
const currentPath = searchResultProducts[0].urlPath;

describe('Component: SearchFormResultList', () => {
  it('should render correctly', () => {
    const fakeApp = (
      <HistoryRouter history={history}>
        <SearchFormResultList
          productInfoList={searchResultProducts}
          onClick={onClick}
          currentPath={currentPath}
        />
      </HistoryRouter>
    );

    render(fakeApp);

    searchResultProducts.forEach((_, index) => {
      expect(
        screen.getByTestId(`searchResultItem-${index}`)
      ).toBeInTheDocument();
    });

    expect(screen.getByTestId('searchResultItem-0')).toHaveClass(
      'form-search__select-item--disabled'
    );
  });

  it('should render string for empty result', () => {
    const fakeApp = (
      <HistoryRouter history={history}>
        <SearchFormResultList
          productInfoList={[]}
          onClick={onClick}
          currentPath={currentPath}
        />
      </HistoryRouter>
    );

    render(fakeApp);

    expect(screen.queryByTestId('searchResultItem-0')).not.toBeInTheDocument();

    expect(
      screen.getByText('По вашему запросу ничего не найдено')
    ).toBeInTheDocument();
  });
});
