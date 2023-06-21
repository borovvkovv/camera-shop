import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type BreadcrumbsProps = {
  crumbs: {
    name: string;
    path: string;
  }[];
};

function Breadcrumbs(props: BreadcrumbsProps): JSX.Element {
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
          {props.crumbs.map((prop, index) => {
            if (props.crumbs.length - 1 === index) {
              return (
                <li
                  className='breadcrumbs__item'
                  key={`index-${prop.name}`}
                >
                  <span className='breadcrumbs__link breadcrumbs__link--active'>
                    {prop.name}
                  </span>
                </li>
              );
            } else {
              return (
                <li
                  className='breadcrumbs__item'
                  key={`index-${prop.name}`}
                >
                  <Link
                    className='breadcrumbs__link'
                    to={prop.path}
                  >
                    {prop.name}
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
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default memo(Breadcrumbs);
