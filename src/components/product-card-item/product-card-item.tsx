import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { ProductCardMode } from '../../enums';
import useRating from '../../hooks/use-rating';
import { ProductCard } from '../../types/product-card';
import { humanizeProductPrice } from '../../utils';
import StarRating from '../star-rating/star-rating';

type ProductCardItemProps = {
  product: ProductCard;
  onBuyClick: (product: ProductCard) => void;
  addClass?: string;
  mode?: ProductCardMode;
  basketProductIds: number[];
};

function ProductCardItem({
  product,
  onBuyClick,
  addClass,
  mode,
  basketProductIds,
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

  const { ratingInfo } = useRating(id);

  const buyButton = basketProductIds.includes(product.id) ? (
    <Link
      className='btn btn--purple-border product-card__btn product-card__btn--in-cart'
      to={AppRoute.Basket}
    >
      <svg
        width='16'
        height='16'
        aria-hidden='true'
      >
        <use xlinkHref='#icon-basket'></use>
      </svg>
      В корзине
    </Link>
  ) : (
    <button
      className='btn btn--purple product-card__btn'
      type='button'
      onClick={() => onBuyClick(product)}
    >
      Купить
    </button>
  );

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
          <StarRating rating={ratingInfo?.rating ?? null} />
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
        {buyButton}
        <Link
          className='btn btn--transparent'
          to={AppRoute.Product.replace(':id', String(id))}
          data-testid='productCardMoreInfo'
        >
          Подробнее
        </Link>
      </div>
    </>
  );

  return !mode || mode === ProductCardMode.Card ? (
    <div className={`product-card ${addClass ?? ''}`}>{content}</div>
  ) : (
    content
  );
}

export default memo(
  ProductCardItem,
  (previous, next) => previous.product === next.product && previous.basketProductIds.length === next.basketProductIds.length
);
