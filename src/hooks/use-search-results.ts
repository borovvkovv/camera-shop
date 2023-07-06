import { useEffect, useState } from 'react';
import { fetchProductsAction } from '../store/api-actions';
import { getProducts } from '../store/data-process/selectors';
import { SearchResultProduct } from '../types/search-result-product';
import { getTopNProductsByPattern } from '../utils';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function useSearchResults(searchPattern: string) {
  const [foundProducts, setFoundProducts] = useState<SearchResultProduct[]>([]);

  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(getProducts);

  useEffect(() => {
    if (searchPattern !== '') {
      if (allProducts.length === 0) {
        dispatch(fetchProductsAction());
      } else {
        setFoundProducts(getTopNProductsByPattern(allProducts, searchPattern));
      }
    }
  }, [allProducts, dispatch, searchPattern]);

  return {
    foundProducts
  };
}
