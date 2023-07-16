import { useEffect, useState } from 'react';
import { State } from '../types/store';
import { useAppSelector } from './use-app-selector';

export default function useFormDisable(selector: (state: State) => boolean) {
  const isSending = useAppSelector(selector);

  const [isFormDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    if (isSending) {
      setFormDisabled(true);
    } else {
      setFormDisabled(false);
    }
  }, [isSending]);

  return isFormDisabled;
}
