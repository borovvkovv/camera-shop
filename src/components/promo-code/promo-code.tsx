import { ChangeEvent, MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import useFormDisable from '../../hooks/use-form-disable';
import usePromoCode from '../../hooks/use-promo-code';
import { fetchPromoCodeAction } from '../../store/api-actions';
import { getIsPromoCodeChecking } from '../../store/app-process/selectors';

function PromoCode(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    promoCode,
    currentPromoCode,
    setCurrentPromoCode,
    isPromoCodeChecking,
    isPromoCodeChecked,
  } = usePromoCode();

  const isPromoCodeInvalid =
    !isPromoCodeChecking && isPromoCodeChecked && !promoCode;
  const isPromoCodeValid = !!promoCode;
  const inputClassNames = `custom-input ${
    isPromoCodeInvalid ? 'is-invalid' : ''
  }${isPromoCodeValid ? 'is-valid' : ''}`;
  const isFormDisabled = useFormDisable(getIsPromoCodeChecking);
  const CheckPromoCodeButtonName = isFormDisabled ? 'Проверяем' : 'Применить';

  function handlePromoCodeChange(evt: ChangeEvent) {
    const value = (evt.target as HTMLInputElement).value;
    const trimmedValue = value.replaceAll(' ', '');
    setCurrentPromoCode(trimmedValue);
  }

  function handlePromoCodeSubmit(evt: MouseEvent) {
    evt.preventDefault();
    dispatch(fetchPromoCodeAction(currentPromoCode ?? ''));
  }

  return (
    <form>
      <div className={inputClassNames} data-testid='PromoCodeInput'>
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
