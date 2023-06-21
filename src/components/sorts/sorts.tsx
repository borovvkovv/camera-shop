import { memo } from 'react';

function Sorts(): JSX.Element {
  return (
    <form action='#'>
      <div className='catalog-sort__inner'>
        <p className='title title--h5'>Сортировать:</p>
        <div className='catalog-sort__type'>
          <div className='catalog-sort__btn-text'>
            <input
              type='radio'
              id='sortPrice'
              name='sort'
              checked
              onChange={() => {
                void 0;
              }}
            />
            <label htmlFor='sortPrice'>по цене</label>
          </div>
          <div className='catalog-sort__btn-text'>
            <input
              type='radio'
              id='sortPopular'
              name='sort'
              onChange={() => {
                void 0;
              }}
            />
            <label htmlFor='sortPopular'>по популярности</label>
          </div>
        </div>
        <div className='catalog-sort__order'>
          <div className='catalog-sort__btn catalog-sort__btn--up'>
            <input
              type='radio'
              id='up'
              name='sort-icon'
              checked
              aria-label='По возрастанию'
              onChange={() => {
                void 0;
              }}
            />
            <label htmlFor='up'>
              <svg
                width={16}
                height={14}
                aria-hidden='true'
              >
                <use xlinkHref='#icon-sort' />
              </svg>
            </label>
          </div>
          <div className='catalog-sort__btn catalog-sort__btn--down'>
            <input
              type='radio'
              id='down'
              name='sort-icon'
              aria-label='По убыванию'
              onChange={() => {
                void 0;
              }}
            />
            <label htmlFor='down'>
              <svg
                width={16}
                height={14}
                aria-hidden='true'
              >
                <use xlinkHref='#icon-sort' />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default memo(Sorts);
