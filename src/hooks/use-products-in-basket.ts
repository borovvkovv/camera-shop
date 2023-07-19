import { useEffect, useState } from 'react';
import { fetchProductsAction } from '../store/api-actions';
import { getProducts } from '../store/data-process/selectors';
import { BasketProduct } from '../types/basket';
import { getProductsInBasket } from '../utils';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function useProductsInBasket() {
  const dispatch = useAppDispatch();

  const allProducts = useAppSelector(getProducts);
  if (allProducts.length === 0) {
    dispatch(fetchProductsAction());
  }
  const [productsInBasket, setproductsInBasket] = useState<BasketProduct[]>([]);

  useEffect(() => {
    setproductsInBasket(getProductsInBasket(allProducts));
    function onStorage() {
      setproductsInBasket(getProductsInBasket(allProducts));
    }
    document.addEventListener('storage', onStorage);
    return () => {
      document.removeEventListener('storage', onStorage);
    };
  }, [allProducts, setproductsInBasket]);

  return { productsInBasket, setproductsInBasket };
}
