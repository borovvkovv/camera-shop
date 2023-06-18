import { useEffect } from 'react';
import { fetchProductAction } from '../store/api-actions';
import { getIsProductLoading, getProduct } from '../store/data-process/selectors';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function useProduct(productId: number) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId !== 0) {
      dispatch(fetchProductAction(productId));
    }
  }, [dispatch, productId]);

  const product = useAppSelector(getProduct);
  const isProductLoading = useAppSelector(getIsProductLoading);

  return { product, isProductLoading };
}
