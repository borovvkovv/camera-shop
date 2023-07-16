import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { BreadCrumb } from '../../types/bread-crumb';

type BreadcrumbsProps = {
  crumbs: BreadCrumb[];
};

function Breadcrumbs({ crumbs }: BreadcrumbsProps): JSX.Element {
  return (
    <div className='breadcrumbs'>
      <div className='container'>
        <ul className='breadcrumbs__list'>
          <li className='breadcrumbs__item'>
            <Link
              className='breadcrumbs__link'
              to={AppRoute.Root}
            >
              Главная
              <svg
                width='5'
                height='8'
                aria-hidden='true'
              >
                <use xlinkHref='#icon-arrow-mini'></use>
              </svg>
            </Link>
          </li>
          {crumbs.map((crumb, index) => {
            if (crumbs.length - 1 === index) {
              return (
                <li
                  className='breadcrumbs__item'
                  key={`index-${crumb.name}`}
                >
                  <span className='breadcrumbs__link breadcrumbs__link--active'>
                    {crumb.name}
                  </span>
                </li>
              );
            }
            return (
              <li
                className='breadcrumbs__item'
                key={`index-${crumb.name}`}
              >
                <Link
                  className='breadcrumbs__link'
                  to={crumb.path}
                >
                  {crumb.name}
                  <svg
                    width='5'
                    height='8'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#icon-arrow-mini'></use>
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default memo(Breadcrumbs);
