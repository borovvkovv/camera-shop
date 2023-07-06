import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../types/product-card';
import { filterProducts, getFilter, getSort } from '../utils';

export default function useFilter(products: ProductCard[]) {
  const [processedProducts, setProcessedProducts] = useState<ProductCard[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = useMemo(() => getSort(searchParams), [searchParams]);
  const filter = useMemo(() => getFilter(searchParams), [searchParams]);

  useEffect(() => {
    setProcessedProducts(filterProducts(products, filter, sort, setSearchParams));
  }, [products, searchParams, setSearchParams, filter, sort]);

  return { filter, processedProducts, searchParams, setSearchParams };
}
