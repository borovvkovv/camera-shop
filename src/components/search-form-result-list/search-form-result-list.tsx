import { KeyboardEvent } from 'react';
import { SearchResultProduct } from '../../types/search-result-product';
import './search-form-result-list.css';

type SearchFormResultListProps = {
  productInfoList: SearchResultProduct[];
  onClick: (urlPath: string) => void;
  currentPath: string;
};

function SearchFormResultList({
  productInfoList,
  onClick,
  currentPath,
}: SearchFormResultListProps): JSX.Element {

  function handleResultProductClick(productInfo: SearchResultProduct) {
    if (currentPath !== productInfo.urlPath) {
      onClick(productInfo.urlPath);
    }
  }

  function handleResultProductKeyDown(productInfo: SearchResultProduct, evt: KeyboardEvent) {
    if (evt.key === 'Enter' && currentPath !== productInfo.urlPath) {
      onClick(productInfo.urlPath);
    }
  }

  return (
    <ul className='form-search__select-list'>
      {productInfoList.length === 0 ? (
        <li
          className='form-search__select-item'
          tabIndex={0}
        >
          По вашему запросу ничего не найдено
        </li>
      ) : (
        productInfoList.map((productInfo, index) => {
          const keyValue = `searchResult-${index}`;
          return (
            <li
              key={keyValue}
              className={`form-search__select-item ${
                currentPath === productInfo.urlPath
                  ? 'form-search__select-item--disabled'
                  : ''
              }`}
              tabIndex={0}
              onClick={() => handleResultProductClick(productInfo)}
              onKeyDown={(evt: KeyboardEvent) => handleResultProductKeyDown(productInfo, evt)}
              data-testid={`searchResultItem-${index}`}
            >
              {productInfo.productName}
            </li>
          );
        })
      )}
    </ul>
  );
}

export default SearchFormResultList;
