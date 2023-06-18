import { useEffect } from 'react';
import { fetchProductsAction } from '../store/api-actions';
import { getIsProductsLoading, getIsProductsLoadingFailed, getProducts } from '../store/data-process/selectors';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function useProducts() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const products = useAppSelector(getProducts);
  const isProductsLoading = useAppSelector(getIsProductsLoading);
  const isProductsLoadingFailed = useAppSelector(getIsProductsLoadingFailed);

  return { products, isProductsLoading, isProductsLoadingFailed };
}
