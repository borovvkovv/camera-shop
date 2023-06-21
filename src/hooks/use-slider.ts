import { useMemo } from 'react';
import { PRODUCTS_ON_SLIDER } from '../const';

export default function useSlider(
  allProductsLength: number,
  currentPage: number
) {
  const fullArray = Array.from({ length: allProductsLength }).map(
    (_, index) => index
  );

  const currentPageIndexes = useMemo(
    () =>
      fullArray.slice(
        currentPage * PRODUCTS_ON_SLIDER - PRODUCTS_ON_SLIDER,
        currentPage * PRODUCTS_ON_SLIDER
      ),
    [currentPage, fullArray]
  );

  const maxPageNumber = useMemo(
    () =>
      Math.ceil(allProductsLength / PRODUCTS_ON_SLIDER)
    ,[allProductsLength]
  );

  return { currentPageIndexes, maxPageNumber };
}
