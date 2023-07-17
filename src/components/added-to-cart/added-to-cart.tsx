import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { redirectToRoute } from '../../store/action';

type AddedToCartProps = {
  modalRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  redirectAfterAddingUrl?: string;
};

function AddedToCart({
  modalRef,
  isVisible,
  setVisibility,
  redirectAfterAddingUrl,
}: AddedToCartProps): JSX.Element {
  const dispatch = useAppDispatch();
  const popupElementClasses = `modal ${
    isVisible ? 'is-active' : ''
  } modal--narrow`;

  function handlePopupCrossClick() {
    setVisibility(false);
  }

  function handleContinueButtonClick(evt: MouseEvent) {
    evt.preventDefault();
    setVisibility(false);
    if (redirectAfterAddingUrl) {
      dispatch(redirectToRoute(redirectAfterAddingUrl));
    }
  }

  function handleGoToBasketClick() {
    dispatch(redirectToRoute(AppRoute.Basket));
  }

  return (
    <div
      className={popupElementClasses}
      data-testid='addedToCartPopup'
    >
      <div className='modal__wrapper'>
        <div className='modal__overlay'></div>
        <div
          className='modal__content'
          ref={modalRef}
        >
          <p className='title title--h4'>Товар успешно добавлен в корзину</p>
          <svg
            className='modal__icon'
            width='86'
            height='80'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-success'></use>
          </svg>
          <div className='modal__buttons'>
            <Link
              className='btn btn--transparent modal__btn'
              to=''
              onClick={handleContinueButtonClick}
            >
              Продолжить покупки
            </Link>
            <button
              className='btn btn--purple modal__btn modal__btn--fit-width'
              onClick={handleGoToBasketClick}
            >
              Перейти в корзину
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
  );
}

export default AddedToCart;
