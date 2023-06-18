import { useMemo } from 'react';
import { ProductCard } from '../types/product-card';
import { PRODUCTS_ON_PAGE } from '../const';

export default function usePagination(
  allProducts: ProductCard[],
  currentPage: number
) {
  const pagedProducts = useMemo(
    () =>
      allProducts.slice(
        currentPage * PRODUCTS_ON_PAGE - PRODUCTS_ON_PAGE,
        currentPage * PRODUCTS_ON_PAGE
      ),
    [allProducts, currentPage]
  );

  const maxPageNumber = Math.ceil(allProducts.length / PRODUCTS_ON_PAGE);

  return { pagedProducts, currentPage, maxPageNumber };
}
