import { MutableRefObject, useEffect, useState } from 'react';

export default function usePopup(modalRef: MutableRefObject<HTMLElement | null>) {
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
