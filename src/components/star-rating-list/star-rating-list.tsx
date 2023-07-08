import { MAX_RATING_STARS } from '../../const';
import { memo } from 'react';
import StarRatingItem from '../star-rating-item/star-rating-item';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { UserReview } from '../../types/user-review';

type StarRatingListProps = {
  currentRating: number;
  onChange: (starsNumber: number) => void;
  disabled: boolean;
  register: UseFormRegister<UserReview>;
  errors: FieldErrors<UserReview>;
};

function StarRatingList({
  currentRating,
  onChange,
  disabled,
  register,
  errors,
}: StarRatingListProps): JSX.Element {
  const starIds = Array.from(
    { length: MAX_RATING_STARS },
    (_, index) => MAX_RATING_STARS - index
  );

  return (
    <fieldset
      className={`rate htmlForm-review__item ${
        errors.rating ? 'is-invalid' : ''
      }`}
    >
      <legend className='rate__caption'>
        Рейтинг
        <svg
          width='9'
          height='9'
          aria-hidden='true'
        >
          <use xlinkHref='#icon-snowflake'></use>
        </svg>
      </legend>
      <div className='rate__bar'>
        <div className='rate__group'>
          {starIds.map((starsNumber) => {
            const index = starsNumber - 1;
            return (
              <StarRatingItem
                key={`star-rating-${starsNumber}`}
                id={index}
                onChange={() => onChange(starsNumber)}
                isChecked={currentRating === starsNumber}
                disabled={disabled}
                register={register}
              />
            );
          })}
        </div>
        <div className='rate__progress'>
          <span className='rate__stars'>{currentRating}</span>
          <span>/</span> <span className='rate__all-stars'>5</span>
        </div>
      </div>
      {errors.rating && (
        <p className='rate__message'>{errors.rating.message}</p>
      )}
    </fieldset>
  );
}

export default memo(StarRatingList);
