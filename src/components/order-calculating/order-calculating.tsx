import { useEffect, useRef } from 'react';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import usePopup from '../../hooks/use-popup';
import { redirectToRoute } from '../../store/action';
import { makeOrderAction } from '../../store/api-actions';
import { emptyBasket } from '../../store/app-process/app-process';
import {
  getIsOrderSentSuccessfully,
  getPromoCode,
} from '../../store/app-process/selectors';
import { BasketProduct } from '../../types/basket';
import { Order } from '../../types/order';
import {
  calculateDiscountPrice,
  calculateProductPrice,
  calculateProductPriceWithDiscount,
  humanizeProductPrice,
} from '../../utils';
import ModalSuccess from '../modal-success/modal-success';

type OrderCalculationProps = {
  productsInBasket: BasketProduct[];
};

function OrderCalculation({
  productsInBasket,
}: OrderCalculationProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isInitialMount = useRef(true);
  const isOrderSentSuccessfully = useAppSelector(getIsOrderSentSuccessfully);

  const {
    modalRef: modalSuccessRef,
    isVisible,
    setVisibility,
  } = usePopup(handleModalSuccessClose);

  const promoCode = useAppSelector(getPromoCode);

  useEffect(() => {
    if (!isInitialMount.current) {
      isInitialMount.current = true;
    }
    return () => {
      isInitialMount.current = false;
    };
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (isOrderSentSuccessfully) {
        setVisibility(true);
      }
    }
  }, [isOrderSentSuccessfully, setVisibility]);

  const totalSumWithoutDiscount = humanizeProductPrice(
    calculateProductPrice(productsInBasket, undefined)
  );

  const discountSumRaw = calculateDiscountPrice(
    productsInBasket,
    promoCode?.discount
  );
  const discountSum = humanizeProductPrice(discountSumRaw);
  const totalSumWithDiscount = humanizeProductPrice(
    calculateProductPriceWithDiscount(productsInBasket, promoCode?.discount)
  );

  const discountSumStyleClass =
    discountSumRaw === 0 ? '' : 'basket__summary-value--bonus';

  function handleSubmitOrderButtonClick() {
    const order: Order = {
      camerasIds: productsInBasket.map((productInfo) => productInfo.product.id),
      coupon: promoCode?.coupon ?? null,
    };
    dispatch(makeOrderAction(order));
  }

  function handleModalSuccessClose() {
    dispatch(emptyBasket());
  }

  function handleModalSuccessClick() {
    dispatch(emptyBasket());
    dispatch(redirectToRoute(AppRoute.Root));
  }

  return (
    <>
      <div className='basket__summary-order'>
        <p className='basket__summary-item'>
          <span className='basket__summary-text'>Всего:</span>
          <span
            className='basket__summary-value'
            data-testid='TotalSum'
          >
            {totalSumWithoutDiscount} ₽
          </span>
        </p>
        <p className='basket__summary-item'>
          <span className='basket__summary-text'>Скидка:</span>
          <span
            className={`basket__summary-value ${discountSumStyleClass}`}
            data-testid='Discount'
          >
            {discountSum} ₽
          </span>
        </p>
        <p className='basket__summary-item'>
          <span className='basket__summary-text basket__summary-text--total'>
            К оплате:
          </span>
          <span
            className='basket__summary-value basket__summary-value--total'
            data-testid='TotalSumWithDiscount'
          >
            {totalSumWithDiscount} ₽
          </span>
        </p>
        <button
          className='btn btn--purple'
          type='submit'
          onClick={handleSubmitOrderButtonClick}
        >
          Оформить заказ
        </button>
      </div>
      <ModalSuccess
        modalRef={modalSuccessRef}
        isVisible={isVisible}
        setVisibility={setVisibility}
        title='Спасибо за покупку'
        onClick={handleModalSuccessClick}
        onClose={handleModalSuccessClose}
      />
    </>
  );
}

export default OrderCalculation;
