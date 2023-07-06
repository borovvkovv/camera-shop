import { renderHook } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-router/history-router';
import { AppRoute } from '../const';
import { ProductCategory, ProductType, QueryParams } from '../enums';
import { getStringFromQueryParams } from '../utils';
import { getFakeProducts } from '../utils/mock';
import useFilter from './use-filter';

describe('Hook: useFilter', () => {
  it('should return', () => {
    const products = getFakeProducts(40);
    const history = createMemoryHistory();
    const searchParams: Record<string, string[]> = {
      [QueryParams.Category]: ['Photo'],
      [QueryParams.Type]: ['Film'],
    };

    history.push({
      pathname: AppRoute.Root,
      search: getStringFromQueryParams(searchParams),
    });

    const {result} = renderHook(() => useFilter(products), {
      wrapper: ({ children }) => (
        <HistoryRouter history={history}>{children}</HistoryRouter>
      ),
    });

    const { processedProducts } = result.current;
    expect(processedProducts).toStrictEqual(products.filter((p) => p.category === ProductCategory['Photo'] && p.type === ProductType['Film']));
  });
});
