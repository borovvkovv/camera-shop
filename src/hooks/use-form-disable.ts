import { useEffect, useState } from 'react';
import { getIsCommentSending } from '../store/data-process/selectors';
import { useAppSelector } from './use-app-selector';

export default function useFormDisable() {
  const isCommentSending = useAppSelector(getIsCommentSending);

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
