import { Helmet } from 'react-helmet-async';
import { useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import AddToCart from '../../components/add-to-cart/add-to-cart';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Filters from '../../components/filters/filters';
import Pagination from '../../components/pagination/pagination';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import { AppRoute } from '../../const';
import usePagination from '../../hooks/use-pagination';
import usePopup from '../../hooks/use-popup';
import useProducts from '../../hooks/use-products';
import { ProductCard } from '../../types/product-card';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import useFilter from '../../hooks/use-filter';
import Sorts from '../../components/sorts/sorts';
import useSort from '../../hooks/use-sort';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { redirectToRoute } from '../../store/action';
import { getStringFromQueryParams } from '../../utils';
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
  const { filter, processedProducts, searchParams, setSearchParams } =
    useFilter(products);
  const { sort, sortedProducts } = useSort(searchParams, processedProducts);
  const { pagedProducts, currentPage, maxPageNumber } = usePagination(
    sortedProducts,
    pageNumber
  );
  const [isFiltering, setIsFiltering] = useState(false);

  const ErrorState = () => (
    <h1 className='title title--h3'>
      Не удалось загрузить товары. Попробуйте позже.
    </h1>
  );
  const LoadingState = () => <h1 className='title title--h3'>Загрузка...</h1>;
  const EmptyState = () => (
    <h1 className='title title--h3'>Товары не найдены</h1>
  );

  const crumbs = useMemo(
    () => [
      {
        name: 'Каталог',
        path: AppRoute.Root,
      },
    ],
    []
  );

  const handleProductCardBuyClick = useMemo(
    () => (product: ProductCard) => {
      setSelectedProduct(product);
      setVisibility(true);
    },
    [setVisibility]
  );

  const dispatch = useAppDispatch();
  function handleFilterSubmit(queryParams: Record<string, string[]>) {
    dispatch(
      redirectToRoute(
        `${AppRoute.Catalog.replace(
          ':id',
          String(1)
        )}${getStringFromQueryParams(queryParams)}`
      )
    );
    setIsFiltering(false);
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
                  <Filters
                    products={sortedProducts}
                    filter={filter}
                    sort={sort}
                    onSubmit={handleFilterSubmit}
                    setFilteringState={setIsFiltering}
                  />
                </div>
              </div>
              <div className='catalog__content'>
                <div className='catalog-sort'>
                  {!isFiltering && (
                    <Sorts
                      filter={filter}
                      sort={sort}
                      setSearchParams={setSearchParams}
                    />
                  )}
                </div>
                {(isProductsLoadingFailed && <ErrorState />) ||
                  (((isProductsLoading && products.length === 0) ||
                    isFiltering) && <LoadingState />) ||
                  (processedProducts.length === 0 && <EmptyState />) || (
                  <ProductCardsList
                    products={pagedProducts}
                    onBuyClick={handleProductCardBuyClick}
                  />
                )}
                {!isFiltering && (
                  <Pagination
                    currentPage={currentPage}
                    maxPageNumber={maxPageNumber}
                    queryParams={searchParams}
                  />
                )}
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
