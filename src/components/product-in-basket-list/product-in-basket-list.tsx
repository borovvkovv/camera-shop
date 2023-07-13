import { useAppSelector } from '../../hooks/use-app-selector';
import { getProductsInBasket } from '../../store/app-process/selectors';
import ProductInBasketItem from '../product-in-basket-item/product-in-basket-item';

function ProductInBasketList(): JSX.Element {
  const products = useAppSelector(getProductsInBasket);

  return (
    <ul className='basket__list'>
      {products.map((basketProduct) => (
        <ProductInBasketItem
          key={basketProduct.product.id}
          product={basketProduct}
        />
      ))}
    </ul>
  );
}

export default ProductInBasketList;
