import { renderHook } from '@testing-library/react';
import { QueryParams } from '../enums';
import { SortBy, SortOrder } from '../types/sort';
import { getMaxPrice, getMinPrice } from '../utils';
import { getFakeProducts } from '../utils/mock';
import useSort from './use-sort';

const searchParams = new URLSearchParams();
searchParams.append(QueryParams.Order, SortBy.Price);
searchParams.append(QueryParams.By, SortOrder.Asc);

describe('Hook: useSort', () => {
  it('should return sorted products considering query params', () => {
    const products = getFakeProducts(40);
    const priceMin = getMinPrice(products);
    const PriceMax = getMaxPrice(products);

    const { result } = renderHook(() => useSort(searchParams, products));

    const { sortedProducts } = result.current;
    expect(sortedProducts[0].price).toBe(priceMin);
    expect(sortedProducts[sortedProducts.length - 1].price).toBe(PriceMax);
  });
});
