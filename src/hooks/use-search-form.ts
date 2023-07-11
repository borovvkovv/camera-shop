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

    function handleKeyDown() {
      let currentFocusableIndex = 0;
      return (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          setFormSearchOpened(false);
          (evt.target as HTMLElement).blur();
        }
        if (
          evt.key === 'Tab' &&
          !evt.shiftKey &&
          evt.target &&
          modalRef.current !== null
        ) {
          const focusablesExceptReset =
            modalRef.current.querySelectorAll('li,input');
          focusablesExceptReset.forEach((element) => {
            if (
              element === evt.target &&
              currentFocusableIndex < focusablesExceptReset.length - 1
            ) {
              currentFocusableIndex += 1;
            }
            if (evt.target === modalRef.current?.querySelector('button')) {
              setFormSearchOpened(false);
            }
          });
        }
        if (
          evt.key === 'Tab' &&
          evt.shiftKey &&
          evt.target &&
          modalRef.current !== null
        ) {
          const focusablesExceptReset =
            modalRef.current.querySelectorAll('li,input');
          focusablesExceptReset.forEach((element) => {
            if (
              element === evt.target &&
              currentFocusableIndex > 0
            ) {
              currentFocusableIndex -= 1;
            }
            if (evt.target === modalRef.current?.querySelector('input')) {
              setFormSearchOpened(false);
            }
          });
        }
        if (modalRef.current !== null && evt.key === 'ArrowUp') {
          evt.preventDefault();
          const focusablesExceptReset =
            modalRef.current?.querySelectorAll('li,input');
          if (currentFocusableIndex > 0) {
            (
              focusablesExceptReset[currentFocusableIndex] as HTMLElement
            ).blur();
            currentFocusableIndex -= 1;
            (
              focusablesExceptReset[currentFocusableIndex] as HTMLElement
            ).focus();
          }
        }
        if (modalRef.current !== null && evt.key === 'ArrowDown') {
          evt.preventDefault();
          const focusablesExceptReset =
            modalRef.current?.querySelectorAll('li,input');
          if (focusablesExceptReset.length > currentFocusableIndex + 1) {
            (
              focusablesExceptReset[currentFocusableIndex] as HTMLElement
            ).blur();
            currentFocusableIndex += 1;
            (
              focusablesExceptReset[currentFocusableIndex] as HTMLElement
            ).focus();
          }
          evt.preventDefault();
        }
      };
    }

    const handleKeyDownClosure = handleKeyDown();

    if (isFormSearchOpened) {
      document.addEventListener('keydown', handleKeyDownClosure);
      document.addEventListener('click', handleClick, true);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDownClosure);
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
