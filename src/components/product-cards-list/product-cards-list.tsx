import { useAppSelector } from '../../hooks/use-app-selector';
import { getProductsInBasket } from '../../store/app-process/selectors';
import { ProductCard } from '../../types/product-card';
import ProductCardItem from '../product-card-item/product-card-item';

type ProductCardsListProps = {
  products: ProductCard[];
  onBuyClick: (product: ProductCard) => void;
};

function ProductCardsList({
  products,
  onBuyClick,
}: ProductCardsListProps): JSX.Element {

  const basketProducts = useAppSelector(getProductsInBasket);
  const basketProductIds = basketProducts.map((productInfo) => productInfo.product.id);

  return (
    <div className='cards catalog__cards'>
      {products.map((product) => (
        <ProductCardItem
          key={product.id}
          product={product}
          onBuyClick={onBuyClick}
          basketProductIds={basketProductIds}
        />
      ))}
    </div>
  );
}

export default ProductCardsList;
