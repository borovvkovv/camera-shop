import { Review } from '../../types/review';
import { formatDateToDayAndMonth, formatDateToYearMonthDay } from '../../utils';
import StarRating from '../star-rating/star-rating';

type ReviewItemProps = {
  reviewItem: Review;
};

function ReviewItem({ reviewItem }: ReviewItemProps): JSX.Element {
  const {
    createAt,
    userName,
    advantage,
    disadvantage,
    review,
    rating,
  } = reviewItem;
  return (
    <li className='review-card' data-testid='reviewCard'>
      <div className='review-card__head'>
        <p className='title title--h4'>{userName}</p>
        <time
          className='review-card__data'
          dateTime={formatDateToYearMonthDay(new Date(createAt))}
        >
          {formatDateToDayAndMonth(new Date(createAt))}
        </time>
      </div>
      <div className='rate review-card__rate'>
        <StarRating rating={rating} />
        <p className='visually-hidden'>Оценка: {rating}</p>
      </div>
      <ul className='review-card__list'>
        <li className='item-list'>
          <span className='item-list__title'>Достоинства:</span>
          <p className='item-list__text'>
            {advantage}
          </p>
        </li>
        <li className='item-list'>
          <span className='item-list__title'>Недостатки:</span>
          {disadvantage}
        </li>
        <li className='item-list'>
          <span className='item-list__title'>Комментарий:</span>
          <p className='item-list__text'>
            {review}
          </p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewItem;
