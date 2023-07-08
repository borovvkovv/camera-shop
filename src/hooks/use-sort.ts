import { useMemo } from 'react';
import { URLSearchParams } from 'url';
import { productsSortCallbackMap } from '../maps';
import { ProductCard } from '../types/product-card';
import { SortBy, SortOrder } from '../types/sort';
import { getSort } from '../utils';

export default function useSort(searchParams: URLSearchParams, processedProducts: ProductCard[]) {
  const sort = useMemo(() => getSort(searchParams), [searchParams]);

  const callback = productsSortCallbackMap[`${sort.order ?? SortOrder.Asc}${sort.by ?? SortBy.Price}`];

  const sortedProducts = useMemo(() => [...processedProducts].sort(callback), [processedProducts, callback]);

  return { sort, sortedProducts };
}
