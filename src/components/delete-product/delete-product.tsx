import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { removeProduct } from '../../services/products-in-basket';
import { ProductCard } from '../../types/product-card';
import { makeProductName } from '../../utils';

type DeleteProductProps = {
  product: ProductCard | undefined;
  modalRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteProduct({
  product,
  modalRef,
  isVisible,
  setVisibility,
}: DeleteProductProps): JSX.Element | null {

  if (!product) {
    return null;
  }

  const {
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    vendorCode,
    level,
    name,
  } = product;

  const popupElementClasses = `modal ${isVisible ? 'is-active' : ''}`;

  function handlePopupCrossClick() {
    setVisibility(false);
  }

  function handleContinueButtonClick(evt: MouseEvent) {
    evt.preventDefault();
    setVisibility(false);
  }

  function handleDeleteButtonClick() {
    if (product) {
      removeProduct(product);
    }

    setVisibility(false);
  }

  return (
    <div
      className={popupElementClasses}
      data-testid='DeleteProductPopup'
    >
      <div className='modal__wrapper'>
        <div className='modal__overlay'></div>
        <div
          className='modal__content'
          ref={modalRef}
        >
          <p className='title title--h4'>Удалить этот товар?</p>
          <div className='basket-item basket-item--short'>
            <div className='basket-item__img'>
              <picture>
                <source
                  type='image/webp'
                  srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
                />
                <img
                  src={`/${previewImg}`}
                  srcSet={`/${previewImg2x} 2x`}
                  width='140'
                  height='120'
                  alt={name}
                />
              </picture>
            </div>
            <div className='basket-item__description'>
              <p className='basket-item__title'>{name}</p>
              <ul className='basket-item__list'>
                <li className='basket-item__list-item'>
                  <span className='basket-item__article'>Артикул:</span>{' '}
                  <span className='basket-item__number'>{vendorCode}</span>
                </li>
                <li className='basket-item__list-item'>
                  {makeProductName(product)}
                </li>
                <li className='basket-item__list-item'>{level} уровень</li>
              </ul>
            </div>
          </div>
          <div className='modal__buttons'>
            <button
              className='btn btn--purple modal__btn modal__btn--half-width'
              type='button'
              onClick={handleDeleteButtonClick}
              data-testid='DeleteButton'
            >
              Удалить
            </button>
            <Link
              className='btn btn--transparent modal__btn modal__btn--half-width'
              to=''
              onClick={handleContinueButtonClick}
            >
              Продолжить покупки
            </Link>
          </div>
          <button
            className='cross-btn'
            type='button'
            aria-label='Закрыть попап'
            onClick={handlePopupCrossClick}
            data-testid='ClosePopupButton'
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

export default DeleteProduct;
