import { useRef } from 'react';
import usePopup from '../../hooks/use-popup';
import { ProductCard } from '../../types/product-card';
import { humanizeProductPrice, makeProductName } from '../../utils';
import AddedToCart from '../added-to-cart/added-to-cart';

type AddToCartProps = {
  product: ProductCard | null;
  modalRef?: React.MutableRefObject<null>;
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddToCart({
  product,
  modalRef,
  isVisible,
  setVisibility,
}: AddToCartProps): JSX.Element | null {
  const modalReviewRef = useRef(null);
  const {
    isVisible: isModalReviewVisible,
    setVisibility: setModalReviewVisibility,
  } = usePopup(modalReviewRef);

  function handlePopupCrossClick() {
    setVisibility(false);
  }

  function handleAddToCartButtonClick() {
    setModalReviewVisibility(true);
    setVisibility(false);
  }

  return (
    product && (
      <>
        <div
          className={`modal ${isVisible ? 'is-active' : ''}`}
          data-testid='AddToCartPopup'
        >
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
                      srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`}
                    />
                    <img
                      src={`/${product.previewImg}`}
                      srcSet={`/${product.previewImg2x} 2x`}
                      width='140'
                      height='120'
                      alt={product.name}
                    />
                  </picture>
                </div>
                <div className='basket-item__description'>
                  <p className='basket-item__title'>{product.name}</p>
                  <ul className='basket-item__list'>
                    <li className='basket-item__list-item'>
                      <span className='basket-item__article'>Артикул:</span>{' '}
                      <span className='basket-item__number'>
                        {product.vendorCode}
                      </span>
                    </li>
                    <li className='basket-item__list-item'>
                      {makeProductName(product)}
                    </li>
                    <li className='basket-item__list-item'>
                      {product.level} уровень
                    </li>
                  </ul>
                  <p className='basket-item__price'>
                    <span className='visually-hidden'>Цена:</span>
                    {humanizeProductPrice(product.price)} ₽
                  </p>
                </div>
              </div>
              <div className='modal__buttons'>
                <button
                  className='btn btn--purple modal__btn modal__btn--fit-width'
                  type='button'
                  onClick={handleAddToCartButtonClick}
                  data-testid='addToCartButton'
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
        <AddedToCart
          modalRef={modalReviewRef}
          isVisible={isModalReviewVisible}
          setVisibility={setModalReviewVisibility}
        />
      </>
    )
  );
}

export default AddToCart;
