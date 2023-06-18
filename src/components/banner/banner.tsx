import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import useProduct from '../../hooks/use-product';
import usePromo from '../../hooks/use-promo';
import { productLevelMap } from '../../maps';
import { fetchPromoAction } from '../../store/api-actions';
import { getIsPromoLoading, getPromo } from '../../store/data-process/selectors';

function Banner(): JSX.Element {

  const stub = (
    <div className='banner'>
      <div
        style={{ width: '1280px', height: '280px', backgroundColor: '#333333' }}
      />
    </div>
  );

  const { promo, isPromoLoading } = usePromo();
  const { product, isProductLoading } = useProduct(promo?.id ?? 0);

  if (isPromoLoading || isProductLoading) {
    return stub;
  }

  if (!promo) {
    return (<div />);
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
          to={AppRoute.Product.replace('{:cameraId}', String(promo.id))}
        >
          Подробнее
        </Link>
      </p>
    </div>
  );
}
export default Banner;