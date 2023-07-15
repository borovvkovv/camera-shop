import { useState } from 'react';
import {
  getIsPromoCodeChecked,
  getIsPromoCodeChecking,
  getPromoCode,
} from '../store/app-process/selectors';
import { useAppSelector } from './use-app-selector';

export default function usePromoCode() {
  const promoCode = useAppSelector(getPromoCode);
  const isPromoCodeChecked = useAppSelector(getIsPromoCodeChecked);
  const isPromoCodeChecking = useAppSelector(getIsPromoCodeChecking);

  const [currentPromoCode, setCurrentPromoCode] = useState<string>(
    promoCode?.coupon ?? ''
  );

  return {
    promoCode,
    currentPromoCode,
    setCurrentPromoCode,
    isPromoCodeChecking,
    isPromoCodeChecked,
  };
}
