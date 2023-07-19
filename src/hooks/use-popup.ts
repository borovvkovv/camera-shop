import { useEffect, useRef, useState } from 'react';

export default function usePopup(
  onClose?: () => void
) {
  const [isVisible, setVisibility] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(evt: MouseEvent) {
      const target = evt.target as HTMLElement;

      if (modalRef.current !== null) {
        const refClasses = Object.values(modalRef.current.classList)
          .map((className) => `.${className}`)
          .join('');

        if (!target.closest(refClasses)) {
          if (onClose) {
            onClose();
          }
          setVisibility(false);
          evt.stopPropagation();
        }
      }
    }

    function handleKeyDown(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        if (onClose) {
          onClose();
        }
        setVisibility(false);
      }

      if (modalRef.current !== null && evt.key === 'Tab') {

        const target = evt.target as HTMLElement;
        const focusables = modalRef.current.querySelectorAll(
          '.btn,input,button,select,textarea,a,[tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusables[0] as HTMLElement;
        const lastElement = focusables[focusables.length - 1] as HTMLElement;
        const refClasses = Object.values(modalRef.current.classList)
          .map((className) => `.${className}`)
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
        }
        else {
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
  }, [isVisible, modalRef, onClose]);

  return { modalRef, isVisible, setVisibility };
}
