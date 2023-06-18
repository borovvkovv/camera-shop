import { memo, MouseEvent, useMemo, useRef, useState } from 'react';
import { ProductCardMode } from '../../enums';
import useSlider from '../../hooks/use-slider';
import { ProductCard } from '../../types/product-card';
import ProductCardItem from '../product-card-item/product-card-item';

type SliderProps = {
  products: ProductCard[];
  onBuyClick: (product: ProductCard) => void;
};

function Slider({ products, onBuyClick }: SliderProps): JSX.Element {

  const slider = useRef(null);
  const [ currentSliderPage, setCurrentSliderPage ] = useState(1);
  const [trigger, settrigger] = useState('fade');
  const { currentPageIndexes, maxPageNumber } = useSlider(
    products.length,
    currentSliderPage
  );


  const handleNextSliderClick = useMemo(
    () =>
      (evt: MouseEvent) => {
        if (evt.target instanceof HTMLButtonElement) {
          evt.target.disabled = true;
        }
        settrigger('fadeOut');
        global.setTimeout(() => {
          setCurrentSliderPage((prev) => prev + 1);
          settrigger('fadeIn');
          if (evt.target instanceof HTMLButtonElement) {
            evt.target.disabled = false;
          }
        }, 800);
      },
    []
  );

  const handlePrevSliderClick = useMemo(() =>
    (evt: MouseEvent) => {
      if (evt.target instanceof HTMLButtonElement) {
        evt.target.disabled = true;
      }
      settrigger('fadeInReverse');
      global.setTimeout(() => {
        setCurrentSliderPage((prev) => prev - 1);
        settrigger('fadeOutReverse');
        if (evt.target instanceof HTMLButtonElement) {
          evt.target.disabled = false;
        }
      }, 800);
    }, []);

  return (
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
  );
}

export default memo(
  Slider,
  (prevProps, nextProps) =>
    prevProps.products === nextProps.products
);
