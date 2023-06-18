import { useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Filters from '../../components/filters/filters';
import Pagination from '../../components/pagination/pagination';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import Sorts from '../../components/sorts/sorts';
import { AppRoute } from '../../const';
import usePagination from '../../hooks/use-pagination';
import usePopup from '../../hooks/use-popup';
import useProducts from '../../hooks/use-products';
import { ProductCard } from '../../types/product-card';
import { humanizeProductPrice, makeProductName } from '../../utils';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function CatalogScreen(): JSX.Element {
  const { pathname } = useLocation();
  const { id: pageAsString } = useParams();
  const pageAsNumber = Number(pageAsString);
  const pageNumber = pathname === AppRoute.Root ? 1 : pageAsNumber;

  const modalRef = useRef(null);
  const { isVisible, setVisibility } = usePopup(modalRef);
  const [selectedProduct, setSelectedProduct] = useState<ProductCard | null>(
    null
  );
  const { products, isProductsLoading, isProductsLoadingFailed } =
    useProducts();
  const { pagedProducts, currentPage, maxPageNumber } = usePagination(
    products,
    pageNumber
  );

  const ErrorState = () => (
    <h1 className='title title--h3'>
      Не удалось загрузить товары. Попробуйте позже.
    </h1>
  );
  const LoadingState = () => <h1 className='title title--h3'>Загрузка...</h1>;
  const EmptyState = () => (
    <h1 className='title title--h3'>Товары не найдены</h1>
  );

  function handlePopupCrossClick() {
    setVisibility(false);
  }

  function handleProductCardBuyClick(product: ProductCard) {
    setSelectedProduct(product);
    setVisibility(true);
  }

  if (
    isNaN(pageNumber) ||
    (maxPageNumber > 0 && pageNumber > maxPageNumber) ||
    pageNumber < 0
  ) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <Banner />
      <div className='page-content'>
        <Breadcrumbs
          crumbs={[
            {
              name: 'Каталог',
              path: AppRoute.Root,
            },
          ]}
        />
        <section className='catalog'>
          <div className='container'>
            <h1 className='title title--h2'>Каталог фото- и видеотехники</h1>
            <div className='page-content__columns'>
              <div className='catalog__aside'>
                <div className='catalog-filter'>
                  <Filters />
                </div>
              </div>
              <div className='catalog__content'>
                <div className='catalog-sort'>
                  <Sorts />
                </div>
                {(isProductsLoadingFailed && <ErrorState />) ||
                  (isProductsLoading && products.length === 0 && (
                    <LoadingState />
                  )) ||
                  (products.length === 0 && <EmptyState />) || (
                    <ProductCardsList
                      products={pagedProducts}
                      onBuyClick={handleProductCardBuyClick}
                    />
                  )}
                <Pagination
                  currentPage={currentPage}
                  maxPageNumber={maxPageNumber}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
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
                      srcSet={`${selectedProduct.previewImgWebp}, ${selectedProduct.previewImgWebp2x} 2x`}
                    />
                    <img
                      src={selectedProduct.previewImg}
                      srcSet={`${selectedProduct.previewImg2x} 2x`}
                      width='140'
                      height='120'
                      alt={selectedProduct.name}
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

export default CatalogScreen;
