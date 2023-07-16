import { memo } from 'react';
import { Link } from 'react-router-dom';
import useProduct from '../../hooks/use-product';
import usePromo from '../../hooks/use-promo';
import { productLevelMap } from '../../maps';
import { getProductUrl } from '../../utils';

function Banner(): JSX.Element | null {
  const { promo, isPromoLoading } = usePromo();
  const { product, isProductLoading } = useProduct(promo?.id ?? 0);

  const stub = (
    <div className='banner'>
      <div
        style={{ width: '1280px', height: '280px', backgroundColor: '#333333' }}
      />
      <span className='visually-hidden'>Загрузка промо-продукта</span>
    </div>
  );

  if (isPromoLoading || isProductLoading) {
    return stub;
  }

  if (!promo) {
    return null;
  }

  const productLevel = product ? productLevelMap[product.level] : null;

  return (
    <div className='banner'>
      <picture>
        <source
          type='image/webp'
          srcSet={`/${promo?.previewImgWebp}, /${promo?.previewImgWebp2x} 2x`}
        />
        <img
          src={`/${promo.previewImg}`}
          srcSet={`/${promo.previewImg2x} 2x`}
          width='1280'
          height='280'
          alt='баннер'
        />
      </picture>
      <p className='banner__info'>
        <span className='banner__message'>Новинка!</span>
        <span className='title title--h1'>{promo.name}</span>
        <span className='banner__text'>
          {productLevel &&
            `${productLevel} камера от${'\u00A0'}известного производителя`}
        </span>
        <Link
          className='btn'
          to={getProductUrl(promo.id)}
        >
          Подробнее
        </Link>
      </p>
    </div>
  );
}
export default memo(Banner);
