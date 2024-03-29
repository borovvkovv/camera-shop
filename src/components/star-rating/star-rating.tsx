import { memo } from 'react';
import { MAX_RATING_STARS } from '../../const';

type StarRatingProps = {
  rating: number | undefined;
};

function StarRating({ rating }: StarRatingProps): JSX.Element {
  const stub = (
    <>
      {Array.from({ length: MAX_RATING_STARS }).map((_, index) => {
        const keyValue = `key-${index}`;
        return (
          <svg
            width={17}
            height={16}
            aria-hidden='true'
            key={keyValue}
          >
            <use xlinkHref='#icon-loading-star' />
          </svg>
        );
      })}
    </>
  );

  if (!rating) {
    return stub;
  }

  const indexRating = rating - 1;
  return (
    <>
      {Array.from({ length: MAX_RATING_STARS }).map((_, index) => {
        const keyValue = `key-${index}`;
        return (
          <svg
            width={17}
            height={16}
            aria-hidden='true'
            key={keyValue}
          >
            <use
              xlinkHref={
                index <= indexRating ? '#icon-full-star' : '#icon-star'
              }
            />
          </svg>
        );
      })}
      <p
        className='visually-hidden'
        data-testid='starRating'
      >
        Рейтинг: {rating}
      </p>
    </>
  );
}

export default memo(StarRating);
