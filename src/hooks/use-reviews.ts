import { useEffect } from 'react';
import { fetchReviewsAction } from '../store/api-actions';
import { getReviews } from '../store/data-process/selectors';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function useReviews(productId: number) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviewsAction(productId));
  }, [dispatch, productId]);

  const reviews = useAppSelector(getReviews);

  return { reviews };
}
