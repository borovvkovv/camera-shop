import { ChangeEvent, useState } from 'react';
import { ProductsInBasketLimitation } from '../../enums';
import { dicrementProduct, incrementProduct, setProductAmount } from '../../services/products-in-basket';
import { BasketProduct } from '../../types/basket';
import {
  calculateProductPrice,
  humanizeProductPrice,
  makeProductName,
} from '../../utils';

type ProductInBasketItemProps = {
  productInfo: BasketProduct;
  onProductDelete: (productInfo: BasketProduct) => void;
};

function ProductInBasketItem({
  productInfo,
  onProductDelete,
}: ProductInBasketItemProps): JSX.Element {
  const [productQuantity, setProductQuantity] = useState(productInfo.quantity);
  const {
    name,
    vendorCode,
    level,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = productInfo.product;

  const productSumPrice = calculateProductPrice([productInfo], undefined);

  const isDicreaseProductsButtonDisabled =
    productInfo.quantity <= ProductsInBasketLimitation.Min;
  const isIncreaseProductsButtonDisabled =
    productInfo.quantity >= ProductsInBasketLimitation.Max;

  function handleDicrementProductsButtonClick() {
    setProductQuantity((prev) => prev - 1);
    dicrementProduct(productInfo.product);
  }

  function handleIncrementProductsButtonClick() {
    setProductQuantity((prev) => prev + 1);
    incrementProduct(productInfo.product);
  }

  function handleRemoveProductButtonClick() {
    onProductDelete(productInfo);
  }

  function handleProductQuantityChange(evt: ChangeEvent) {
    let quantity = Number((evt.target as HTMLInputElement).value);
    if (!isNaN(quantity)) {
      if (quantity < ProductsInBasketLimitation.Min) {
        quantity = ProductsInBasketLimitation.Min;
      } else if (quantity > ProductsInBasketLimitation.Max) {
        quantity = ProductsInBasketLimitation.Max;
      }
      setProductQuantity(quantity);
      setProductAmount({ ...productInfo, quantity });
    }
  }

  return (
    <li
      className='basket-item'
      data-testid='ProductInBasketItem'
    >
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
            alt={makeProductName(productInfo.product)}
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
            {makeProductName(productInfo.product)}
          </li>
          <li className='basket-item__list-item'>{level} уровень</li>
        </ul>
      </div>
      <p
        className='basket-item__price'
        data-testid='ProductPrice'
      >
        <span className='visually-hidden'>Цена:</span>
        {humanizeProductPrice(price)} ₽
      </p>
      <div className='quantity'>
        <button
          className='btn-icon btn-icon--prev'
          aria-label='уменьшить количество товара'
          onClick={handleDicrementProductsButtonClick}
          disabled={isDicreaseProductsButtonDisabled}
        >
          <svg
            width='7'
            height='12'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-arrow'></use>
          </svg>
        </button>
        <label
          className='visually-hidden'
          htmlFor='counter1'
        />
        <input
          type='number'
          id='counter1'
          value={productQuantity}
          min='1'
          max='99'
          aria-label='количество товара'
          onChange={handleProductQuantityChange}
        />
        <button
          className='btn-icon btn-icon--next'
          aria-label='увеличить количество товара'
          onClick={handleIncrementProductsButtonClick}
          disabled={isIncreaseProductsButtonDisabled}
        >
          <svg
            width='7'
            height='12'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-arrow'></use>
          </svg>
        </button>
      </div>
      <div
        className='basket-item__total-price'
        data-testid='ProductSumPrice'
      >
        <span className='visually-hidden'>Общая цена:</span>
        {humanizeProductPrice(productSumPrice)} ₽
      </div>
      <button
        className='cross-btn'
        type='button'
        aria-label='Удалить товар'
        onClick={handleRemoveProductButtonClick}
        data-testid='DeleteProductButton'
      >
        <svg
          width='10'
          height='10'
          aria-hidden='true'
        >
          <use xlinkHref='#icon-close'></use>
        </svg>
      </button>
    </li>
  );
}

export default ProductInBasketItem;
