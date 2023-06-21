import { memo, MouseEvent, useMemo, useRef, useState } from 'react';
import { ProductCardMode } from '../../enums';
import useSlider from '../../hooks/use-slider';
import { ProductCard } from '../../types/product-card';
import ProductCardItem from '../product-card-item/product-card-item';

type SliderProps = {
  products: ProductCard[];
  onBuyClick: (product: ProductCard) => void;
};

function Slider({ products, onBuyClick }: SliderProps): JSX.Element | null {
  const slider = useRef(null);
  const [currentSliderPage, setCurrentSliderPage] = useState(1);
  const [trigger, setTrigger] = useState('fade');
  const { currentPageIndexes, maxPageNumber } = useSlider(
    products.length,
    currentSliderPage
  );

  const handleNextSliderClick = useMemo(
    () => (evt: MouseEvent) => {
      if (evt.target instanceof HTMLButtonElement) {
        evt.target.disabled = true;
      }
      setTrigger('fadeOut');
      global.setTimeout(() => {
        setCurrentSliderPage((prev) => prev + 1);
        setTrigger('fadeIn');
        if (evt.target instanceof HTMLButtonElement) {
          evt.target.disabled = false;
        }
      }, 800);
    },
    []
  );

  const handlePrevSliderClick = useMemo(
    () => (evt: MouseEvent) => {
      if (evt.target instanceof HTMLButtonElement) {
        evt.target.disabled = true;
      }
      setTrigger('fadeInReverse');
      global.setTimeout(() => {
        setCurrentSliderPage((prev) => prev - 1);
        setTrigger('fadeOutReverse');
        if (evt.target instanceof HTMLButtonElement) {
          evt.target.disabled = false;
        }
      }, 800);
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
                    animation: `${trigger} 1s`,
                  }}
                  data-testid='productCardSlider'
                >
                  <ProductCardItem
                    key={product.id}
                    product={product}
                    onBuyClick={onBuyClick}
                    mode={ProductCardMode.Slider}
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
  (prevProps, nextProps) => prevProps.products === nextProps.products
);
