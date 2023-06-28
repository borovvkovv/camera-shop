import { useEffect } from 'react';
import { fetchReviewsAction } from '../store/api-actions';
import { getProductsRating } from '../store/data-process/selectors';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function useRating(productId: number) {
  const dispatch = useAppDispatch();

  const ratings = useAppSelector(getProductsRating);

  const rating = ratings.find((r) => r.productId === productId);

  useEffect(() => {
    if (!rating) {
      dispatch(fetchReviewsAction(productId));
    }
  }, [dispatch, productId, rating]);

  return { ratingInfo: rating ?? null };
}
