import { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ReviewList from '../../components/review-list/review-list';
import Slider from '../../components/slider/slider';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import usePopup from '../../hooks/use-popup';
import useProduct from '../../hooks/use-product';
import useSimilarProducts from '../../hooks/use-similar-products';
import { redirectToRoute } from '../../store/action';
import { ProductCard } from '../../types/product-card';
import { humanizeProductPrice, makeProductName } from '../../utils';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function ProductScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id: idAsString, tab: tabAsString } = useParams();
  const id = Number(idAsString);
  const tab = !tabAsString ? 'characteristics' : tabAsString;

  const { product, isProductLoading } = useProduct(id);
  const { similarProducts } = useSimilarProducts(id);
  const [selectedProduct, setSelectedProduct] = useState<ProductCard | null>(
    null
  );
  const modalRef = useRef(null);
  const { isVisible, setVisibility } = usePopup(modalRef);
  const characteristics = useRef(null);
  const text = useRef(null);

  function handlePopupCrossClick() {
    setVisibility(false);
  }

  const handleProductCardBuyClick = useMemo(
    () => (productCard: ProductCard) => {
      setSelectedProduct(productCard);
      setVisibility(true);
    },
    [setVisibility]
  );

  function toggleTabsControls() {
    if (characteristics.current && text.current) {
      (characteristics.current as Element).classList.toggle('is-active');
      (text.current as Element).classList.toggle('is-active');
    }
  }

  if (isNaN(id)) {
    return <NotFoundScreen />;
  }

  if (isProductLoading) {
    return <h1 className='title title--h3'>Загрузка...</h1>;
  }

  if (!product) {
    return (
      <h1 className='title title--h3'>
        Не удалось загрузить товар. Попробуйте позже.
      </h1>
    );
  }

  const {
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    name,
    price,
    reviewCount,
    level,
    vendorCode,
    description,
    type,
    category,
  } = product;

  return (
    <>
      <Breadcrumbs
        crumbs={[
          {
            name: 'Каталог',
            path: AppRoute.Root,
          },
          {
            name: product.name,
            path: AppRoute.Product.replace(':id', String(id)),
          },
        ]}
      />
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
                <svg
                  width={17}
                  height={16}
                  aria-hidden='true'
                >
                  <use xlinkHref='#icon-full-star' />
                </svg>
                <svg
                  width={17}
                  height={16}
                  aria-hidden='true'
                >
                  <use xlinkHref='#icon-full-star' />
                </svg>
                <svg
                  width={17}
                  height={16}
                  aria-hidden='true'
                >
                  <use xlinkHref='#icon-star' />
                </svg>
                <svg
                  width={17}
                  height={16}
                  aria-hidden='true'
                >
                  <use xlinkHref='#icon-star' />
                </svg>
                <svg
                  width={17}
                  height={16}
                  aria-hidden='true'
                >
                  <use xlinkHref='#icon-star' />
                </svg>
                <p className='visually-hidden'>Рейтинг: 2</p>
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
              <div className='tabs product__tabs'>
                <div className='tabs__controls product__tabs-controls'>
                  <button
                    className={`tabs__control ${
                      tab === 'characteristics' ? 'is-active' : ''
                    }`}
                    type='button'
                    onClick={() => {
                      dispatch(
                        redirectToRoute(`/cameras/${id}/characteristics`)
                      );
                      toggleTabsControls();
                    }}
                  >
                    Характеристики
                  </button>
                  <button
                    className={`tabs__control ${
                      tab === 'text' ? 'is-active' : ''
                    }`}
                    type='button'
                    onClick={() => {
                      dispatch(redirectToRoute(`/cameras/${id}/text`));
                      toggleTabsControls();
                    }}
                  >
                    Описание
                  </button>
                </div>
                <div className='tabs__content'>
                  <div
                    className='tabs__element'
                    ref={characteristics}
                  >
                    <ul className='product__tabs-list'>
                      <li className='item-list'>
                        <span className='item-list__title'>Артикул:</span>
                        <p className='item-list__text'> {vendorCode}</p>
                      </li>
                      <li className='item-list'>
                        <span className='item-list__title'>Категория:</span>
                        <p className='item-list__text'>{category}</p>
                      </li>
                      <li className='item-list'>
                        <span className='item-list__title'>Тип камеры:</span>
                        <p className='item-list__text'>{type}</p>
                      </li>
                      <li className='item-list'>
                        <span className='item-list__title'>Уровень:</span>
                        <p className='item-list__text'>{level}</p>
                      </li>
                    </ul>
                  </div>
                  <div
                    className='tabs__element is-active'
                    ref={text}
                  >
                    <div className='product__tabs-text'>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {similarProducts && similarProducts.length > 0 && (
        <div className='page-content__section'>
          <section className='product-similar'>
            <div className='container'>
              <h2 className='title title--h3'>Похожие товары</h2>
              <Slider
                products={similarProducts}
                onBuyClick={handleProductCardBuyClick}
              />
            </div>
          </section>
        </div>
      )}
      <ReviewList productId={id} />
      {selectedProduct && (
        <div className={`modal ${isVisible ? 'is-active' : ''}`}>
          <div className='modal__wrapper'>
            <div className='modal__overlay'></div>
            <div
              className='modal__content'
              ref={modalRef}
            >
              <p className='title title--h4'>Добавить товар в корзину</p>
              <div className='basket-item basket-item--short'>
                <div className='basket-item__img'>
                  <picture>
                    <source
                      type='image/webp'
                      srcSet={`/${selectedProduct.previewImgWebp}, /${selectedProduct.previewImgWebp2x} 2x`}
                    />
                    <img
                      src={`/${selectedProduct.previewImg}`}
                      srcSet={`/${selectedProduct.previewImg2x} 2x`}
                      width='140'
                      height='120'
                      alt={name}
                    />
                  </picture>
                </div>
                <div className='basket-item__description'>
                  <p className='basket-item__title'>{selectedProduct.name}</p>
                  <ul className='basket-item__list'>
                    <li className='basket-item__list-item'>
                      <span className='basket-item__article'>Артикул:</span>{' '}
                      <span className='basket-item__number'>
                        {selectedProduct.vendorCode}
                      </span>
                    </li>
                    <li className='basket-item__list-item'>
                      {makeProductName(selectedProduct)}
                    </li>
                    <li className='basket-item__list-item'>
                      {selectedProduct.level} уровень
                    </li>
                  </ul>
                  <p className='basket-item__price'>
                    <span className='visually-hidden'>Цена:</span>
                    {humanizeProductPrice(selectedProduct.price)} ₽
                  </p>
                </div>
              </div>
              <div className='modal__buttons'>
                <button
                  className='btn btn--purple modal__btn modal__btn--fit-width'
                  type='button'
                >
                  <svg
                    width='24'
                    height='16'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#icon-add-basket'></use>
                  </svg>
                  Добавить в корзину
                </button>
              </div>
              <button
                className='cross-btn'
                type='button'
                aria-label='Закрыть попап'
                onClick={handlePopupCrossClick}
              >
                <svg
                  width='10'
                  height='10'
                  aria-hidden='true'
                >
                  <use xlinkHref='#icon-close'></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductScreen;
