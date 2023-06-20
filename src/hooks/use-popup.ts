import { MutableRefObject, useEffect, useState } from 'react';

export default function usePopup(
  modalRef: MutableRefObject<HTMLElement | null>
) {
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    function handleClick(evt: MouseEvent) {
      const target = evt.target as HTMLElement;

      if (modalRef.current !== null) {
        const refClasses = Object.values(modalRef.current.classList)
          .map((c) => `.${c}`)
          .join('');

        if (!target.closest(refClasses)) {
          setVisibility(false);
          evt.stopPropagation();
        }
      }
    }

    function handleKeyDown(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        setVisibility(false);
      }

      if (modalRef.current !== null && evt.key === 'Tab') {

        const target = evt.target as HTMLElement;
        const focusables = modalRef.current.querySelectorAll(
          'input,button,select,textarea,a,[tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusables[0] as HTMLElement;
        const lastElement = focusables[focusables.length - 1] as HTMLElement;
        const refClasses = Object.values(modalRef.current.classList)
          .map((c) => `.${c}`)
          .join('');

        if (!target.closest(refClasses)) {
          if (evt.shiftKey) {
            target.blur();
            lastElement.focus();
            evt.preventDefault();
          } else {
            target.blur();
            firstElement.focus();
            evt.preventDefault();
          }
        } else {
          if (evt.shiftKey) {
            if (evt.target === firstElement) {
              target.blur();
              lastElement.focus();
              evt.preventDefault();
            }
          } else {
            if (evt.target === lastElement) {
              target.blur();
              firstElement.focus();
              evt.preventDefault();
            }
          }
        }
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClick, true);
      document.body.classList.add('scroll-lock');
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick, true);
      document.body.classList.remove('scroll-lock');
    };
  }, [isVisible, modalRef]);

  return { isVisible, setVisibility };
}
