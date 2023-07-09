import { useEffect, useMemo } from 'react';
import { fetchReviewsAction } from '../store/api-actions';
import { getReviews } from '../store/data-process/selectors';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function useReviews(productId: number) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviewsAction(productId));
  }, [dispatch, productId]);

  const allReviews = useAppSelector(getReviews);
  const reviews = useMemo(
    () => allReviews.filter((reviewItem) => reviewItem.cameraId === productId),
    [productId, allReviews]
  );

  return { reviews };
}
