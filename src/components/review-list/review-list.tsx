import { memo, useMemo } from 'react';
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

  const {
    modalRef: modalUserCommentRef,
    isVisible: isModalUserCommentVisible,
    setVisibility: setModalUserCommentVisibility,
  } = usePopup();

  let loadMoreReviewsButtonElement: JSX.Element | null = null;
  if (currentPage < maxPageNumber) {
    loadMoreReviewsButtonElement = (
      <div className='review-block__buttons'>
        <button
          className='btn btn--purple'
          type='button'
          onClick={handleLoadMoreReviewsButtonClick}
          data-testid='loadMoreReviewsButton'
        >
          Показать больше отзывов
        </button>
      </div>
    );
  }

  const noReviewsElement = <h1 className='title title--h3'>Нет отзывов</h1>;
  const reviewsElements = !reviews.length ? noReviewsElement : (
    <ul className='review-block__list'>
      {pagedComments.map((review) => (
        <ReviewItem
          key={review.id}
          reviewItem={review}
        />
      ))}
    </ul>
  );

  function handleAddReviewButtonClick() {
    setModalUserCommentVisibility(true);
  }

  function handleLoadMoreReviewsButtonClick() {
    setCurrentPage((previous) => previous + 1);
  }

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
                onClick={handleAddReviewButtonClick}
                data-testid='leaveYourReviewButton'
              >
                Оставить свой отзыв
              </button>
            </div>
            {reviewsElements}
            {loadMoreReviewsButtonElement}
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
