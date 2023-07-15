import { ChangeEvent, MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import useFormDisable from '../../hooks/use-form-disable';
import { fetchPromoCodeAction } from '../../store/api-actions';
import { getIsPromoCodeChecking } from '../../store/app-process/selectors';
import { PromoCodeInfo } from '../../types/promo-code-info';
type PromoCodeProps = {
  promoCode: PromoCodeInfo | undefined;
  currentPromoCode: string;
  setCurrentPromoCode: React.Dispatch<React.SetStateAction<string>>;
  isPromoCodeChecking: boolean;
  isPromoCodeChecked: boolean;
};

function PromoCode({
  promoCode,
  currentPromoCode,
  setCurrentPromoCode,
  isPromoCodeChecking,
  isPromoCodeChecked,
}: PromoCodeProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isPromoCodeInvalid =
    !isPromoCodeChecking && isPromoCodeChecked && !promoCode;
  const isPromoCodeValid = !!promoCode;
  const inputClassNames = `custom-input ${
    isPromoCodeInvalid ? 'is-invalid' : ''
  }${isPromoCodeValid ? 'is-valid' : ''}`;
  const isFormDisabled = useFormDisable(getIsPromoCodeChecking);
  const CheckPromoCodeButtonName = isFormDisabled ? 'Проверяем' : 'Применить';

  function handlePromoCodeChange(evt: ChangeEvent) {
    setCurrentPromoCode((evt.target as HTMLInputElement).value);
  }

  function handlePromoCodeSubmit(evt: MouseEvent) {
    evt.preventDefault();
    dispatch(fetchPromoCodeAction(currentPromoCode ?? ''));
  }

  return (
    <form>
      <div className={inputClassNames}>
        <label>
          <span className='custom-input__label'>Промокод</span>
          <input
            type='text'
            name='promo'
            placeholder='Введите промокод'
            value={currentPromoCode}
            onChange={handlePromoCodeChange}
            disabled={isFormDisabled}
          />
        </label>
        <p className='custom-input__error'>Промокод неверный</p>
        <p className='custom-input__success'>Промокод принят!</p>
      </div>
      <button
        className='btn'
        type='submit'
        onClick={handlePromoCodeSubmit}
        disabled={isFormDisabled}
      >
        {CheckPromoCodeButtonName}
      </button>
    </form>
  );
}

export default PromoCode;
