import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { ProductCardMode } from '../../enums';
import { ProductCard } from '../../types/product-card';
import { humanizeProductPrice } from '../../utils';
import StarRating from '../star-rating/star-rating';

type ProductCardItemProps = {
  product: ProductCard;
  onBuyClick: (product: ProductCard) => void;
  addClass?: string;
  mode?: ProductCardMode;
};

function ProductCardItem({
  product,
  onBuyClick,
  addClass,
  mode,
}: ProductCardItemProps): JSX.Element {
  const {
    id,
    name,
    price,
    reviewCount,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = product;

  const content = (
    <>
      <div className='product-card__img'>
        <picture>
          <source
            type='image/webp'
            srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
          />
          <img
            src={`/${previewImg}`}
            srcSet={`/${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className='product-card__info'>
        <div className='rate product-card__rate'>
          <StarRating rating={2} />
          <p className='rate__count'>
            <span className='visually-hidden'>Всего оценок:</span>
            {reviewCount}
          </p>
        </div>
        <p className='product-card__title'>{name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>
          {humanizeProductPrice(price)} ₽
        </p>
      </div>
      <div className='product-card__buttons'>
        <button
          className='btn btn--purple product-card__btn'
          type='button'
          onClick={() => onBuyClick(product)}
        >
          Купить
        </button>
        <Link
          className='btn btn--transparent'
          to={AppRoute.Product.replace(':id', String(id))}
        >
          Подробнее
        </Link>
      </div>
    </>
  );

  return mode && mode === ProductCardMode.Card ? (
    <div className={`product-card ${addClass ?? ''}`}>{content}</div>
  ) : (
    content
  );
}

export default memo(ProductCardItem, (prev, next) => prev.product === next.product);
