import { Helmet } from 'react-helmet-async';
import { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import AddToCart from '../../components/add-to-cart/add-to-cart';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ReviewList from '../../components/review-list/review-list';
import Slider from '../../components/slider/slider';
import { AppRoute } from '../../const';
import usePopup from '../../hooks/use-popup';
import useProduct from '../../hooks/use-product';
import useSimilarProducts from '../../hooks/use-similar-products';
import { ProductCard } from '../../types/product-card';
import { humanizeProductPrice } from '../../utils';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import StarRating from '../../components/star-rating/star-rating';
import ProductInfoTabs from '../../components/product-info-tabs/product-info-tabs';
import { ProductInfoTabMode } from '../../enums';
import useRating from '../../hooks/use-rating';

function ProductScreen(): JSX.Element {
  const { id: idAsString, tab: tabAsString } = useParams();
  const id = Number(idAsString);

  const productInfoModeValues = Object.values(ProductInfoTabMode);
  let tabMode: ProductInfoTabMode | undefined = tabAsString as ProductInfoTabMode;

  if (
    productInfoModeValues.indexOf(
      tabMode ?? ProductInfoTabMode.Characteristics
    ) === -1
  ) {
    tabMode = undefined;
  }
  const { product, isProductLoading } = useProduct(id);
  const { similarProducts } = useSimilarProducts(id);
  const { ratingInfo } = useRating(id);

  const [selectedProduct, setSelectedProduct] = useState<ProductCard | null>(
    null
  );
  const modalRef = useRef(null);
  const { isVisible, setVisibility } = usePopup(modalRef);

  const crumbs = useMemo(
    () => [
      {
        name: 'Каталог',
        path: AppRoute.Root,
      },
      {
        name: !product ? '' : product.name,
        path: AppRoute.Product.replace(':id', String(id)),
      },
    ],
    [id, product]
  );

  const handleProductCardBuyClick = useMemo(
    () => (productCard: ProductCard) => {
      setSelectedProduct(productCard);
      setVisibility(true);
    },
    [setVisibility]
  );

  if (tabMode && !tabMode) {
    return <NotFoundScreen />;
  }

  if (isNaN(id)) {
    return <NotFoundScreen />;
  }

  if (isProductLoading) {
    return <h1 className='title title--h3'>Загрузка...</h1>;
  }

  if (!product) {
    return <NotFoundScreen />;
  }

  const {
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    name,
    price,
    reviewCount,
  } = product;

  return (
    <>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <Breadcrumbs crumbs={crumbs} />
      <div className='page-content__section'>
        <section className='product'>
          <div className='container'>
            <div className='product__img'>
              <picture>
                <source
                  type='image/webp'
                  srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
                />
                <img
                  src={`/${previewImg}`}
                  srcSet={`/${previewImg2x} 2x`}
                  width={560}
                  height={480}
                  alt={name}
                />
              </picture>
            </div>
            <div className='product__content'>
              <h1 className='title title--h3'>{name}</h1>
              <div className='rate product__rate'>
                <StarRating rating={ratingInfo?.rating ?? null} />
                <p className='rate__count'>
                  <span className='visually-hidden'>Всего оценок:</span>
                  {reviewCount}
                </p>
              </div>
              <p className='product__price'>
                <span className='visually-hidden'>Цена:</span>
                {humanizeProductPrice(price)} ₽
              </p>
              <button
                className='btn btn--purple'
                type='button'
                onClick={() => handleProductCardBuyClick(product)}
              >
                <svg
                  width={24}
                  height={16}
                  aria-hidden='true'
                >
                  <use xlinkHref='#icon-add-basket' />
                </svg>
                Добавить в корзину
              </button>
              <ProductInfoTabs
                product={product}
                tabMode={tabMode}
              />
            </div>
          </div>
        </section>
      </div>
      <Slider
        products={similarProducts}
        onBuyClick={handleProductCardBuyClick}
      />
      <ReviewList productId={id} />
      <AddToCart
        product={selectedProduct}
        modalRef={modalRef}
        isVisible={isVisible}
        setVisibility={setVisibility}
      />
    </>
  );
}

export default ProductScreen;
