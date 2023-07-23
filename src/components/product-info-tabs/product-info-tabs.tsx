import { ProductInfoTabMode } from '../../enums';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { redirectToRoute } from '../../store/action';
import { ProductCard } from '../../types/product-card';
import { getProductTabUrl } from '../../utils';

type ProductInfoTabsProps = {
  product: ProductCard;
  tabMode: ProductInfoTabMode | null;
};

function ProductInfoTabs({
  product,
  tabMode,
}: ProductInfoTabsProps): JSX.Element {
  const tabModeLocal = tabMode ?? ProductInfoTabMode.Characteristics;

  const dispatch = useAppDispatch();

  const { level, vendorCode, description, type, category } = product;

  function handleCharacteristicsButtonClick() {
    dispatch(
      redirectToRoute(
        getProductTabUrl(product.id, ProductInfoTabMode.Characteristics)
      )
    );
  }

  function handleTextButtonClick() {
    dispatch(
      redirectToRoute(
        getProductTabUrl(product.id, ProductInfoTabMode.Description)
      )
    );
  }

  return (
    <div className='tabs product__tabs'>
      <div className='tabs__controls product__tabs-controls'>
        <button
          className={`tabs__control ${
            tabModeLocal === ProductInfoTabMode.Characteristics
              ? 'is-active'
              : ''
          }`}
          type='button'
          onClick={handleCharacteristicsButtonClick}
          data-testid='buttonCharacteristicsTab'
        >
          Характеристики
        </button>
        <button
          className={`tabs__control ${
            tabModeLocal === ProductInfoTabMode.Description ? 'is-active' : ''
          }`}
          type='button'
          onClick={handleTextButtonClick}
          data-testid='buttonTextTab'
        >
          Описание
        </button>
      </div>
      <div className='tabs__content'>
        <div
          className={`tabs__element ${
            tabModeLocal === ProductInfoTabMode.Characteristics
              ? 'is-active'
              : ''
          }`}
          data-testid='characteristicsTab'
        >
          <ul className='product__tabs-list'>
            <li className='item-list'>
              <span className='item-list__title'>Артикул:</span>
              <p className='item-list__text'> {vendorCode}</p>
            </li>
            <li className='item-list'>
              <span className='item-list__title'>Категория:</span>
              <p className='item-list__text'>{category}</p>
            </li>
            <li className='item-list'>
              <span className='item-list__title'>Тип камеры:</span>
              <p className='item-list__text'>{type}</p>
            </li>
            <li className='item-list'>
              <span className='item-list__title'>Уровень:</span>
              <p className='item-list__text'>{level}</p>
            </li>
          </ul>
        </div>
        <div
          className={`tabs__element ${
            tabModeLocal === ProductInfoTabMode.Description ? 'is-active' : ''
          }`}
          data-testid='textTab'
        >
          <div className='product__tabs-text'>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfoTabs;
