import { useEffect, useState } from 'react';
import { getIsCommentSending } from '../store/data-process/selectors';
import { State } from '../types/store';
import { useAppSelector } from './use-app-selector';

export default function useFormDisable(selector: (state: State) => boolean) {
  const isCommentSending = useAppSelector(selector);

  const [isFormDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    if (isCommentSending) {
      setFormDisabled(true);
    } else {
      setFormDisabled(false);
    }
  }, [isCommentSending]);

  return isFormDisabled;
}
