import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import useFormDisable from '../../hooks/use-form-disable';
import usePopup from '../../hooks/use-popup';
import { addReviewAction } from '../../store/api-actions';
import { getIsCommentSending, getIsCommentSent } from '../../store/data-process/selectors';
import { UserReview } from '../../types/user-review';
import StarRatingList from '../star-rating-list/star-rating-list';
import ModalSuccess from '../modal-success/modal-success';

type UserReviewProps = {
  productId: number;
  modalRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

function UserComment({
  productId,
  modalRef,
  isVisible,
  setVisibility,
}: UserReviewProps): JSX.Element {
  const initialState = useMemo<UserReview>(
    () => ({
      cameraId: productId,
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 0,
    }),
    [productId]
  );

  const dispatch = useAppDispatch();
  const [userReview, setUserReview] = useState<UserReview>(initialState);
  const isFormDisabled = useFormDisable(getIsCommentSending);
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<UserReview>({
    mode: 'onBlur',
  });
  const isCommentSent = useAppSelector(getIsCommentSent);
  const {
    modalRef: modalCommentSuccessRef,
    isVisible: isModalCommentSuccessVisible,
    setVisibility: setCommentSuccessVisibility,
  } = usePopup();

  useEffect(() => {
    if (isCommentSent) {
      setVisibility(false);

      setCommentSuccessVisibility(isCommentSent);
    }
  }, [isCommentSent, setCommentSuccessVisibility, setVisibility]);

  const handleRatingChange = useCallback(
    (starsNumber: number) => {
      setUserReview((previous) => ({ ...previous, rating: starsNumber }));
    },
    [setUserReview]
  );

  function handleNameChange({ target }: ChangeEvent<HTMLInputElement>) {
    setUserReview((previous) => ({ ...previous, userName: target.value }));
  }

  function handleAdvantagesChange({ target }: ChangeEvent<HTMLInputElement>) {
    setUserReview((previous) => ({ ...previous, advantage: target.value }));
  }

  function handleDisadvantagesChange({
    target,
  }: ChangeEvent<HTMLInputElement>) {
    setUserReview((previous) => ({ ...previous, disadvantage: target.value }));
  }

  function handleTextChange({ target }: ChangeEvent<HTMLTextAreaElement>) {
    setUserReview((previous) => ({ ...previous, review: target.value }));
  }

  const onSubmitValid: SubmitHandler<UserReview> = () => {
    dispatch(addReviewAction(userReview));
  };

  function handlePopupCrossClick() {
    setVisibility(false);
  }

  const handleStarRatingChange = useMemo(
    () => (number: number) => {
      handleRatingChange(number);
      unregister('rating');
    },
    [handleRatingChange, unregister]
  );

  return (
    <>
      <div
        className={`modal ${isVisible ? 'is-active' : ''}`}
        data-testid='modalYourReview'
      >
        <div className='modal__wrapper'>
          <div className='modal__overlay'></div>
          <div
            className='modal__content'
            ref={modalRef}
          >
            <button
              className='cross-btn'
              type='button'
              aria-label='Закрыть попап'
              onClick={handlePopupCrossClick}
              data-testid='closeUserComment'
            >
              <svg
                width='10'
                height='10'
                aria-hidden='true'
              >
                <use xlinkHref='#icon-close'></use>
              </svg>
            </button>
            <p className='title title--h4'>Оставить отзыв</p>
            <div className='htmlForm-review'>
              <form onSubmit={(evt) => void handleSubmit(onSubmitValid)(evt)}>
                <div className='form-review__rate'>
                  <StarRatingList
                    currentRating={userReview.rating}
                    onChange={handleStarRatingChange}
                    disabled={isFormDisabled}
                    register={register}
                    errors={errors}
                  />
                  <div
                    className={`custom-input htmlForm-review__item ${
                      errors.userName ? 'is-invalid' : ''
                    }`}
                  >
                    <label>
                      <span className='custom-input__label'>
                        Ваше имя
                        <svg
                          width='9'
                          height='9'
                          aria-hidden='true'
                        >
                          <use xlinkHref='#icon-snowflake'></use>
                        </svg>
                      </span>
                      <input
                        type='text'
                        placeholder='Введите ваше имя'
                        aria-invalid={errors.userName ? 'true' : 'false'}
                        {...register('userName', {
                          required: 'Нужно указать имя',
                          value: userReview.userName,
                          onChange: handleNameChange,
                          disabled: isFormDisabled,
                        })}
                        data-testid='userCommentName'
                      />
                    </label>
                    {errors.userName && (
                      <p className='custom-input__error'>
                        {errors.userName.message}
                      </p>
                    )}
                  </div>
                  <div
                    className={`custom-input htmlForm-review__item ${
                      errors.advantage ? 'is-invalid' : ''
                    }`}
                  >
                    <label>
                      <span className='custom-input__label'>
                        Достоинства
                        <svg
                          width='9'
                          height='9'
                          aria-hidden='true'
                        >
                          <use xlinkHref='#icon-snowflake'></use>
                        </svg>
                      </span>
                      <input
                        type='text'
                        placeholder='Основные преимущества товара'
                        {...register('advantage', {
                          required: 'Нужно указать достоинства',
                          onChange: handleAdvantagesChange,
                          value: userReview.advantage,
                          disabled: isFormDisabled,
                        })}
                        data-testid='userCommentAdvantage'
                      />
                    </label>
                    {errors.advantage && (
                      <p className='custom-input__error'>
                        {errors.advantage.message}
                      </p>
                    )}
                  </div>
                  <div
                    className={`custom-input htmlForm-review__item ${
                      errors.disadvantage ? 'is-invalid' : ''
                    }`}
                  >
                    <label>
                      <span className='custom-input__label'>
                        Недостатки
                        <svg
                          width='9'
                          height='9'
                          aria-hidden='true'
                        >
                          <use xlinkHref='#icon-snowflake'></use>
                        </svg>
                      </span>
                      <input
                        type='text'
                        placeholder='Главные недостатки товара'
                        {...register('disadvantage', {
                          required: 'Нужно указать недостатки',
                          onChange: handleDisadvantagesChange,
                          value: userReview.disadvantage,
                          disabled: isFormDisabled,
                        })}
                        data-testid='userCommentDisadvantage'
                      />
                    </label>
                    {errors.disadvantage && (
                      <p className='custom-input__error'>
                        {errors.disadvantage.message}
                      </p>
                    )}
                  </div>
                  <div
                    className={`custom-textarea htmlForm-review__item ${
                      errors.review ? 'is-invalid' : ''
                    }`}
                  >
                    <label>
                      <span className='custom-textarea__label'>
                        Комментарий
                        <svg
                          width='9'
                          height='9'
                          aria-hidden='true'
                        >
                          <use xlinkHref='#icon-snowflake'></use>
                        </svg>
                      </span>
                      <textarea
                        placeholder='Поделитесь своим опытом покупки'
                        {...register('review', {
                          required: 'Нужно добавить комментарий',
                          minLength: {
                            value: 5,
                            message: 'Минимум 5 символов',
                          },
                          onChange: handleTextChange,
                          value: userReview.review,
                          disabled: isFormDisabled,
                        })}
                        data-testid='userCommentText'
                      />
                    </label>
                    {errors.review && (
                      <div className='custom-textarea__error'>
                        {errors.review.message}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className='btn btn--purple htmlForm-review__btn'
                  type='submit'
                  disabled={isFormDisabled}
                  data-testid='sendUserComment'
                >
                  Отправить отзыв
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ModalSuccess
        modalRef={modalCommentSuccessRef}
        isVisible={isModalCommentSuccessVisible}
        setVisibility={setCommentSuccessVisibility}
        title='Спасибо за отзыв'
      />
    </>
  );
}

export default memo(UserComment);
