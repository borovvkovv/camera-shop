import usePopup from '../../hooks/use-popup';
import { incrementProduct } from '../../services/products-in-basket';
import { ProductCard } from '../../types/product-card';
import { humanizeProductPrice, makeProductName } from '../../utils';
import AddedToCart from '../added-to-cart/added-to-cart';

type AddToCartProps = {
  product: ProductCard | null;
  modalRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  redirectAfterAddingUrl?: string;
};

function AddToCart({
  product,
  modalRef,
  isVisible,
  setVisibility,
  redirectAfterAddingUrl
}: AddToCartProps): JSX.Element | null {

  const {
    modalRef: modalAddedRef,
    isVisible: isModalAddedVisible,
    setVisibility: setModalAddedVisibility,
  } = usePopup();

  const popupElementClasses = `modal ${isVisible ? 'is-active' : ''}`;

  function handlePopupCrossClick() {
    setVisibility(false);
  }

  function handleAddToCartButtonClick() {
    if (product) {
      incrementProduct(product);
    }

    setModalAddedVisibility(true);
    setVisibility(false);
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <div
        className={popupElementClasses}
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
        modalRef={modalAddedRef}
        isVisible={isModalAddedVisible}
        setVisibility={setModalAddedVisibility}
        redirectAfterAddingUrl={redirectAfterAddingUrl}
      />
    </>
  );
}

export default AddToCart;
