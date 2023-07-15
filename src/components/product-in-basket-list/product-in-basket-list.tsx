import { BasketProduct } from '../../types/basket';
import ProductInBasketItem from '../product-in-basket-item/product-in-basket-item';

type ProductInBasketListProps = {
  productsInBasket: BasketProduct[];
  onProductDelete: ((productInfo: BasketProduct) => void);
};

function ProductInBasketList({
  productsInBasket,
  onProductDelete,
}: ProductInBasketListProps): JSX.Element {
  return (
    <ul className='basket__list'>
      {productsInBasket.map((basketProduct) => (
        <ProductInBasketItem
          key={basketProduct.product.id}
          productInfo={basketProduct}
          onProductDelete={onProductDelete}
        />
      ))}
    </ul>
  );
}

export default ProductInBasketList;
