import { memo } from 'react';
type UserCommentSuccessProps = {
  modalRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
  onClose?: () => void;
  title: string;
};

function ModalSuccess({
  modalRef,
  isVisible,
  setVisibility,
  onClick,
  onClose,
  title,
}: UserCommentSuccessProps): JSX.Element {

  const popupElementClasses = `modal ${isVisible ? 'is-active' : ''} modal--narrow`;

  function handlePopupCrossClick() {
    if (onClose) {
      onClose();
    }
    setVisibility(false);
  }

  function handleButtonClick() {
    if (onClick) {
      onClick();
    }
    setVisibility(false);
  }

  return (
    <div className={popupElementClasses}>
      <div className='modal__wrapper'>
        <div className='modal__overlay'></div>
        <div
          className='modal__content'
          ref={modalRef}
        >
          <p className='title title--h4'>{title}</p>
          <svg
            className='modal__icon'
            width='80'
            height='78'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-review-success'></use>
          </svg>
          <div className='modal__buttons'>
            <button
              className='btn btn--purple modal__btn modal__btn--fit-width'
              type='button'
              onClick={handleButtonClick}
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className='cross-btn'
            type='button'
            aria-label='Закрыть попап'
            onClick={handlePopupCrossClick}
          >
            <svg
              width='10'
              height='10'
              aria-hidden='true'
            >
              <use xlinkHref='#icon-close'></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ModalSuccess);
