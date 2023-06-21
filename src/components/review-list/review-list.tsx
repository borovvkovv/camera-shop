import { memo, useMemo, useRef } from 'react';
import useCommentsPagination from '../../hooks/use-comments-pagination';
import usePopup from '../../hooks/use-popup';
import useReviews from '../../hooks/use-reviews';
import ReviewItem from '../review-item/review-item';
import UserComment from '../user-comment/user-comment';

type ReviewListProps = {
  productId: number;
};

function ReviewList({ productId }: ReviewListProps): JSX.Element {
  const { reviews } = useReviews(productId);
  const reviewsSorted = useMemo(
    () =>
      [...reviews].sort(
        (review1, review2) =>
          Date.parse(review2.createAt) - Date.parse(review1.createAt)
      ),
    [reviews]
  );
  const { pagedComments, currentPage, setCurrentPage, maxPageNumber } =
    useCommentsPagination(reviewsSorted);

  const modalUserCommentRef = useRef(null);
  const {
    isVisible: isModalUserCommentVisible,
    setVisibility: setModalUserCommentVisibility,
  } = usePopup(modalUserCommentRef);

  return (
    <>
      <div className='page-content__section'>
        <section className='review-block'>
          <div className='container'>
            <div className='page-content__headed'>
              <h2 className='title title--h3'>Отзывы</h2>
              <button
                className='btn'
                type='button'
                onClick={() => setModalUserCommentVisibility(true)}
                data-testid='leaveYourReviewButton'
              >
                Оставить свой отзыв
              </button>
            </div>
            {!reviews.length ? (
              <h1 className='title title--h3'>Нет отзывов</h1>
            ) : (
              <ul className='review-block__list'>
                {pagedComments.map((review) => (
                  <ReviewItem
                    key={review.id}
                    reviewItem={review}
                  />
                ))}
              </ul>
            )}
            {currentPage < maxPageNumber && (
              <div className='review-block__buttons'>
                <button
                  className='btn btn--purple'
                  type='button'
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  data-testid='loadMoreReviewsButton'
                >
                  Показать больше отзывов
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
      <UserComment
        productId={productId}
        modalRef={modalUserCommentRef}
        isVisible={isModalUserCommentVisible}
        setVisibility={setModalUserCommentVisibility}
      />
    </>
  );
}

export default memo(ReviewList);
