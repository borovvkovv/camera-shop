import { MutableRefObject, useEffect, useState } from 'react';

export default function useSearchForm(
  modalRef: MutableRefObject<HTMLElement | null>
) {
  const [isFormSearchOpened, setFormSearchOpened] = useState(false);
  const [searchPattern, setSearchPattern] = useState('');

  useEffect(() => {
    setFormSearchOpened(!!searchPattern);
  }, [searchPattern]);

  useEffect(() => {
    function handleClick(evt: MouseEvent) {
      const target = evt.target as HTMLElement;

      if (modalRef.current !== null) {
        const refClasses = Object.values(modalRef.current.classList)
          .map((className) => `.${className}`)
          .join('');

        if (!target.closest(refClasses)) {
          setFormSearchOpened(false);
          evt.stopPropagation();
        }
      }
    }

    function handleKeyDown(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        setFormSearchOpened(false);
        (evt.target as HTMLElement).blur();
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

    if (isFormSearchOpened) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClick, true);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick, true);
    };
  }, [isFormSearchOpened, modalRef, searchPattern]);

  return {
    isFormSearchOpened,
    setFormSearchOpened,
    searchPattern,
    setSearchPattern,
  };
}
