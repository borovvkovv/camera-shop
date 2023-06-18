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
  return (
    <div className='cards catalog__cards'>
      {products.map((product) => (
        <ProductCardItem
          key={product.id}
          product={product}
          onBuyClick={onBuyClick}
        />
      ))}
    </div>
  );
}

export default ProductCardsList;
