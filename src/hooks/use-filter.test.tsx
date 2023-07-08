import { renderHook } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-router/history-router';
import { AppRoute } from '../const';
import { ProductCategory, ProductType, QueryParam } from '../enums';
import { getStringFromQueryParams } from '../utils';
import { getFakeProducts } from '../utils/mock';
import useFilter from './use-filter';

describe('Hook: useFilter', () => {
  it('should return', () => {
    const products = getFakeProducts(40);
    const history = createMemoryHistory();
    const selectedCategory: keyof typeof ProductCategory = 'Photo';
    const selectedType: keyof typeof ProductType = 'Film';
    const searchParams: Record<string, string[]> = {
      [QueryParam.Category]: [selectedCategory],
      [QueryParam.Type]: [selectedType],
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
    expect(processedProducts).toStrictEqual(
      products.filter(
        (product) =>
          product.category === ProductCategory[selectedCategory] &&
          product.type === ProductType[selectedType]
      )
    );
  });
});
