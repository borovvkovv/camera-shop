import { useEffect } from 'react';
import { fetchPromoAction } from '../store/api-actions';
import {  getIsPromoLoading, getPromo } from '../store/data-process/selectors';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function usePromo() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

  const promo = useAppSelector(getPromo);
  const isPromoLoading = useAppSelector(getIsPromoLoading);

  return { promo, isPromoLoading };
}
