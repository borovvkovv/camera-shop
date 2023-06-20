import { UseFormRegister } from 'react-hook-form';
import { CommentStarTitles } from '../../const';
import { UserReview } from '../../types/user-review';

type StarRatingProps = {
  id: number;
  onChange: () => void;
  isChecked: boolean;
  disabled: boolean;
  register: UseFormRegister<UserReview>;
};

export default function StarRatingItem({
  id,
  onChange,
  isChecked,
  disabled,
  register,
}: StarRatingProps): JSX.Element {
  const starsCount = id + 1;

  return (
    <>
      <input
        className='visually-hidden'
        id={`star-${starsCount}`}
        type='radio'
        checked={isChecked}
        value={starsCount}
        disabled={disabled}
        data-testid={`star-${starsCount}`}
        {...register('rating', {
          required: 'Нужно оценить товар'
        })}
        onChange={onChange}
      />
      <label
        className='rate__label'
        htmlFor={`star-${starsCount}`}
        title={CommentStarTitles[id]}
        data-testid={`star-label-${starsCount}`}
      />
    </>
  );
}
