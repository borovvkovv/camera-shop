import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductInBasketList from '../../components/product-in-basket-list/product-in-basket-list';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchPromoCodeAction } from '../../store/api-actions';
import { getIsPromoCodeChecked, getIsPromoCodeChecking, getProductsInBasket, getPromoCode } from '../../store/app-process/selectors';
import { calculateDiscountPrice, calculateProductPrice, humanizeProductPrice } from '../../utils';

function Basket(): JSX.Element {
  const crumbs = useMemo(
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

  const dispatch = useAppDispatch();
  const isPromoCodeChecked = useAppSelector(getIsPromoCodeChecked);
  const isPromoCodeChecking = useAppSelector(getIsPromoCodeChecking);

  const promoCode = useAppSelector(getPromoCode);
  const [currentPromoCode, setCurrentPromoCode] = useState<string | undefined>(promoCode?.coupon.coupon);

  const productsInBasket = useAppSelector(getProductsInBasket);

  function handlePromoCodeChange(evt: ChangeEvent) {
    setCurrentPromoCode((evt.target as HTMLInputElement).value);
  }

  function handlePromoCodeSubmit(evt: MouseEvent) {
    evt.preventDefault();
    dispatch(fetchPromoCodeAction(currentPromoCode ?? ''));
  }

  const isPromoCodeInvalid = !isPromoCodeChecking && isPromoCodeChecked && !promoCode;
  const isPromoCodeValid = !!promoCode;
  const inputClassNames = `custom-input ${
    isPromoCodeInvalid ? 'is-invalid' : ''
  }${isPromoCodeValid ? 'is-valid' : ''}`;

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
            <ProductInBasketList />
            <div className='basket__summary'>
              <div className='basket__promo'>
                <p className='title title--h4'>
                  Если у вас есть промокод на скидку, примените его в этом поле
                </p>
                <div className='basket-form'>
                  <form action='#'>
                    <div className={inputClassNames}>
                      <label>
                        <span className='custom-input__label'>Промокод</span>
                        <input
                          type='text'
                          name='promo'
                          placeholder='Введите промокод'
                          value={currentPromoCode}
                          onChange={handlePromoCodeChange}
                        />
                      </label>
                      <p className='custom-input__error'>Промокод неверный</p>
                      <p className='custom-input__success'>Промокод принят!</p>
                    </div>
                    <button
                      className='btn'
                      type='submit'
                      onClick={handlePromoCodeSubmit}
                    >
                      Применить
                    </button>
                  </form>
                </div>
              </div>
              <div className='basket__summary-order'>
                <p className='basket__summary-item'>
                  <span className='basket__summary-text'>Всего:</span>
                  <span className='basket__summary-value'>
                    {humanizeProductPrice(
                      calculateProductPrice(productsInBasket, undefined)
                    )}{' '}
                    ₽
                  </span>
                </p>
                <p className='basket__summary-item'>
                  <span className='basket__summary-text'>Скидка:</span>
                  <span className='basket__summary-value basket__summary-value--bonus'>
                    {humanizeProductPrice(
                      calculateDiscountPrice(
                        productsInBasket,
                        promoCode?.discount
                      )
                    )}
                    ₽
                  </span>
                </p>
                <p className='basket__summary-item'>
                  <span className='basket__summary-text basket__summary-text--total'>
                    К оплате:
                  </span>
                  <span className='basket__summary-value basket__summary-value--total'>
                    {humanizeProductPrice(
                      calculateProductPrice(productsInBasket, promoCode?.discount)
                    )}{' '}
                    ₽
                  </span>
                </p>
                <button
                  className='btn btn--purple'
                  type='submit'
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Basket;
