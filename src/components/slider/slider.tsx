import { memo, MouseEvent, useMemo, useRef, useState } from 'react';
import { ProductCardMode, SliderKeyFrames } from '../../enums';
import { useAppSelector } from '../../hooks/use-app-selector';
import useSlider from '../../hooks/use-slider';
import { getProductsInBasket } from '../../store/app-process/selectors';
import { ProductCard } from '../../types/product-card';
import ProductCardItem from '../product-card-item/product-card-item';
import './slider.css';

type SliderProps = {
  products: ProductCard[];
  onBuyClick: (product: ProductCard) => void;
};

function Slider({ products, onBuyClick }: SliderProps): JSX.Element | null {
  const slider = useRef(null);
  const [currentSliderPage, setCurrentSliderPage] = useState(1);
  const [trigger, setTrigger] = useState('');
  const { currentPageIndexes, maxPageNumber } = useSlider(
    products.length,
    currentSliderPage
  );
  const basketProducts = useAppSelector(getProductsInBasket);
  const basketProductIds = basketProducts.map(
    (productInfo) => productInfo.product.id
  );

  const handleNextSliderClick = useMemo(
    () => (evt: MouseEvent) => {
      if (evt.target instanceof HTMLButtonElement) {
        evt.target.disabled = true;
      }
      setTrigger(SliderKeyFrames.FadeOut);
      global.setTimeout(() => {
        setCurrentSliderPage((previous) => previous + 1);
        setTrigger(SliderKeyFrames.FadeIn);
        if (evt.target instanceof HTMLButtonElement) {
          evt.target.disabled = false;
        }
      }, 300);
    },
    []
  );

  const handlePrevSliderClick = useMemo(
    () => (evt: MouseEvent) => {
      if (evt.target instanceof HTMLButtonElement) {
        evt.target.disabled = true;
      }
      setTrigger(SliderKeyFrames.FadeOutReverse);
      global.setTimeout(() => {
        setCurrentSliderPage((previous) => previous - 1);
        setTrigger(SliderKeyFrames.FadeInReverse);
        if (evt.target instanceof HTMLButtonElement) {
          evt.target.disabled = false;
        }
      }, 300);
    },
    []
  );

  if (!products.length) {
    return null;
  }

  return (
    <div className='page-content__section'>
      <section className='product-similar'>
        <div className='container'>
          <h2 className='title title--h3'>Похожие товары</h2>
          <div className='product-similar__slider'>
            <div
              className='product-similar__slider-list'
              ref={slider}
            >
              {products.map((product, index) => (
                <div
                  className={`product-card ${
                    currentPageIndexes.includes(index) ? 'is-active' : ''
                  }`}
                  key={product.id}
                  style={{
                    animation: `${trigger} 0.35s`,
                  }}
                  data-testid='productCardSlider'
                >
                  <ProductCardItem
                    key={product.id}
                    product={product}
                    onBuyClick={onBuyClick}
                    mode={ProductCardMode.Slider}
                    basketProductIds={basketProductIds}
                  />
                </div>
              ))}
            </div>
            <button
              className='slider-controls slider-controls--prev'
              onClick={handlePrevSliderClick}
              type='button'
              aria-label='Предыдущий слайд'
              disabled={currentSliderPage <= 1}
              data-testid='prevSlide'
            >
              <svg
                width={7}
                height={12}
                aria-hidden='true'
              >
                <use xlinkHref='#icon-arrow' />
              </svg>
            </button>
            <button
              className='slider-controls slider-controls--next'
              onClick={handleNextSliderClick}
              type='button'
              aria-label='Следующий слайд'
              disabled={currentSliderPage >= maxPageNumber}
              data-testid='nextSlide'
            >
              <svg
                width={7}
                height={12}
                aria-hidden='true'
              >
                <use xlinkHref='#icon-arrow' />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(
  Slider,
  (previousProps, nextProps) => previousProps.products === nextProps.products
);
