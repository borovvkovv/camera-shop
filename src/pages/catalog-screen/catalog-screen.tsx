import { Helmet } from 'react-helmet-async';
import { useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import AddToCart from '../../components/add-to-cart/add-to-cart';
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
import NotFoundScreen from '../not-found-screen/not-found-screen';

function CatalogScreen(): JSX.Element {
  const { pathname } = useLocation();
  const { id: pageAsString } = useParams();
  const pageAsNumber = Number(pageAsString);
  const pageNumber = pathname === AppRoute.Root ? 1 : pageAsNumber;

  const [selectedProduct, setSelectedProduct] = useState<ProductCard | null>(
    null
  );
  const modalRef = useRef(null);
  const { isVisible, setVisibility } = usePopup(modalRef);

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

  const crumbs = useMemo(() =>
    [
      {
        name: 'Каталог',
        path: AppRoute.Root,
      },
    ]
  , []);

  const handleProductCardBuyClick = useMemo(
    () => (product: ProductCard) => {
      setSelectedProduct(product);
      setVisibility(true);
    },
    [setVisibility]
  );

  if (
    isNaN(pageNumber) ||
    (maxPageNumber > 0 && pageNumber > maxPageNumber) ||
    pageNumber < 0
  ) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <Helmet>
        <title>Каталог</title>
      </Helmet>
      <Banner />
      <div className='page-content'>
        <Breadcrumbs crumbs={crumbs} />
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

      <AddToCart
        product={selectedProduct}
        modalRef={modalRef}
        isVisible={isVisible}
        setVisibility={setVisibility}
      />
    </>
  );
}

export default CatalogScreen;
