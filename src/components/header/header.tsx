import { ChangeEvent, FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import useSearchForm from '../../hooks/use-search-form';
import useSearchResults from '../../hooks/use-search-results';
import { redirectToRoute } from '../../store/action';
import SearchFormResultList from '../search-form-result-list/search-form-result-list';
import { useLocation } from 'react-router';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getProductsInBasket } from '../../store/app-process/selectors';
import { calculateProductsInBasket } from '../../utils';

function Header(): JSX.Element {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const {
    isFormSearchOpened,
    setFormSearchOpened,
    searchPattern,
    setSearchPattern,
  } = useSearchForm(ref);
  const { foundProducts } = useSearchResults(searchPattern);
  const productsInBasketLength = calculateProductsInBasket(
    useAppSelector(getProductsInBasket)
  );

  const productsInBasketCounter =
    productsInBasketLength === 0 ? null : (
      <span
        className='header__basket-count'
        data-testid='ProductsInBasketCounter'
      >
        {productsInBasketLength}
      </span>
    );

  function handleInputSearchChange({ target }: ChangeEvent<HTMLInputElement>) {
    setSearchPattern(target.value);
  }

  function handleInputSearchFocus() {
    setFormSearchOpened(searchPattern !== '');
  }

  function handleSearchFormResetClick() {
    setSearchPattern('');
  }

  function handleSearchResultProductClick(urlPath: string) {
    dispatch(redirectToRoute(urlPath));
    setFormSearchOpened(false);
  }

  return (
    <header
      className='header'
      id='header'
    >
      <div className='container'>
        <Link
          className='header__logo'
          to={AppRoute.Root}
          aria-label='Переход на главную'
        >
          <svg
            width='100'
            height='36'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-logo'></use>
          </svg>
        </Link>
        <nav className='main-nav header__main-nav'>
          <ul className='main-nav__list'>
            <li className='main-nav__item'>
              <Link
                className='main-nav__link'
                to={AppRoute.Root}
              >
                Каталог
              </Link>
            </li>
            <li className='main-nav__item'>
              <Link
                className='main-nav__link'
                to='/'
              >
                Гарантии
              </Link>
            </li>
            <li className='main-nav__item'>
              <Link
                className='main-nav__link'
                to='/'
              >
                Доставка
              </Link>
            </li>
            <li className='main-nav__item'>
              <Link
                className='main-nav__link'
                to='/'
              >
                О компании
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className={`form-search ${isFormSearchOpened ? 'list-opened' : ''}`}
          ref={ref}
          data-testid='formSearchContainer'
        >
          <form onSubmit={(evt: FormEvent) => evt.preventDefault()}>
            <label>
              <svg
                className='form-search__icon'
                width='16'
                height='16'
                aria-hidden='true'
              >
                <use xlinkHref='#icon-lens'></use>
              </svg>
              <input
                className='form-search__input'
                type='text'
                autoComplete='off'
                placeholder='Поиск по сайту'
                onChange={handleInputSearchChange}
                value={searchPattern}
                onFocus={handleInputSearchFocus}
              />
            </label>
            <SearchFormResultList
              productInfoList={foundProducts}
              onClick={handleSearchResultProductClick}
              currentPath={pathname}
            />
          </form>
          <button
            className='form-search__reset'
            type='reset'
            onClick={handleSearchFormResetClick}
          >
            <svg
              width='10'
              height='10'
              aria-hidden='true'
            >
              <use xlinkHref='#icon-close'></use>
            </svg>
            <span className='visually-hidden'>Сбросить поиск</span>
          </button>
        </div>
        <Link
          className='header__basket-link'
          to={AppRoute.Basket}
        >
          <svg
            width='16'
            height='16'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-basket'></use>
          </svg>
          {productsInBasketCounter}
        </Link>
      </div>
    </header>
  );
}

export default Header;
