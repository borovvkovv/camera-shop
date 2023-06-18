import { useEffect } from 'react';
import { fetchSimilarProductsAction } from '../store/api-actions';
import { getSimilarProducts } from '../store/data-process/selectors';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function useSimilarProducts(productId: number) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSimilarProductsAction(productId));
  }, [dispatch, productId]);

  const similarProducts = useAppSelector(getSimilarProducts);

  return { similarProducts };
}
