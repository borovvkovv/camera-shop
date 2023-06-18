import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type PaginationProps = {
  currentPage: number;
  maxPageNumber: number;
};

function Pagination({
  currentPage,
  maxPageNumber,
}: PaginationProps): JSX.Element {
  return (
    <div className='pagination'>
      <ul className='pagination__list'>
        {currentPage > 1 && (
          <li className='pagination__item'>
            <Link
              className='pagination__link pagination__link--text'
              to={`${AppRoute.Catalog.replace(':id', `${currentPage - 1}`)}`}
            >
              Назад
            </Link>
          </li>
        )}
        {Array.from({ length: maxPageNumber }).map((_, index) => (
          <li
            className='pagination__item'
            key={`page_${index + 1}`}
          >
            <Link
              className={`pagination__link ${
                index + 1 === currentPage ? 'pagination__link--active' : ''
              }`}
              to={`${AppRoute.Catalog.replace(':id', `${index + 1}`)}`}
            >
              {index + 1}
            </Link>
          </li>
        ))}
        {currentPage < maxPageNumber && (
          <li className='pagination__item'>
            <Link
              className='pagination__link pagination__link--text'
              to={`${AppRoute.Catalog.replace(':id', `${currentPage + 1}`)}`}
            >
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
