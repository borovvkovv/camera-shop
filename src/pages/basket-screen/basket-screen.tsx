import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import DeleteProduct from '../../components/delete-product/delete-product';
import OrderCalculation from '../../components/order-calculating/order-calculating';
import ProductInBasketList from '../../components/product-in-basket-list/product-in-basket-list';
import PromoCode from '../../components/promo-code/promo-code';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import usePopup from '../../hooks/use-popup';
import usePromoCode from '../../hooks/use-promo-code';
import { getProductsInBasket } from '../../store/app-process/selectors';
import { BasketProduct } from '../../types/basket';
import { BreadCrumb } from '../../types/bread-crumb';
function BasketScreen(): JSX.Element {
  const crumbs: BreadCrumb[] = useMemo(
    () => [
      {
        name: 'Каталог',
        path: AppRoute.Root,
      },
      {
        name: 'Корзина',
        path: AppRoute.Basket,
      },
    ],
    []
  );

  const { modalRef, isVisible, setVisibility } = usePopup();

  const {
    promoCode,
    currentPromoCode,
    setCurrentPromoCode,
    isPromoCodeChecking,
    isPromoCodeChecked,
  } = usePromoCode();

  const productsInBasket = useAppSelector(getProductsInBasket);

  const [productInfoToDelete, setProductInfoToDelete] = useState<
    BasketProduct | undefined
  >(undefined);

  const emptyBasketStub = (
    <h1 className='title title--h3'>Нет товаров в корзине</h1>
  );

  function handleDeleteProductButtonClick(productInfo: BasketProduct) {
    setProductInfoToDelete(productInfo);

    setVisibility(true);
  }

  return (
    <>
      <Helmet>
        <title>Корзина</title>
      </Helmet>
      <div className='page-content'>
        <Breadcrumbs crumbs={crumbs} />
        <section className='basket'>
          <div className='container'>
            <h1 className='title title--h2'>Корзина</h1>
            {productsInBasket.length === 0 ? (
              emptyBasketStub
            ) : (
              <>
                <ProductInBasketList
                  productsInBasket={productsInBasket}
                  onProductDelete={handleDeleteProductButtonClick}
                />
                <div className='basket__summary'>
                  <div className='basket__promo'>
                    <p className='title title--h4'>
                      Если у вас есть промокод на скидку, примените его в этом
                      поле
                    </p>
                    <div className='basket-form'>
                      <PromoCode
                        promoCode={promoCode}
                        currentPromoCode={currentPromoCode}
                        setCurrentPromoCode={setCurrentPromoCode}
                        isPromoCodeChecked={isPromoCodeChecked}
                        isPromoCodeChecking={isPromoCodeChecking}
                      />
                    </div>
                  </div>
                  <OrderCalculation
                    productsInBasket={productsInBasket}
                    promoCode={promoCode}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </div>
      <DeleteProduct
        product={productInfoToDelete?.product}
        modalRef={modalRef}
        isVisible={isVisible}
        setVisibility={setVisibility}
      />
    </>
  );
}

export default BasketScreen;
