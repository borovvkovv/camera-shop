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
  const emptyBasketStub = (
    <li
      className='form-search__select-item'
      tabIndex={0}
    >
      По вашему запросу ничего не найдено
    </li>
  );

  function handleResultClick(productInfo: SearchResultProduct) {
    if (currentPath !== productInfo.urlPath) {
      onClick(productInfo.urlPath);
    }
  }

  function handleResultKeyDown(
    productInfo: SearchResultProduct,
    evt: KeyboardEvent
  ) {
    if (evt.key === 'Enter' && currentPath !== productInfo.urlPath) {
      onClick(productInfo.urlPath);
    }
  }

  return (
    <ul className='form-search__select-list'>
      {!productInfoList.length && emptyBasketStub}
      {productInfoList.map((productInfo, index) => {
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
            onClick={() => handleResultClick(productInfo)}
            onKeyDown={(evt: KeyboardEvent) =>
              handleResultKeyDown(productInfo, evt)}
            data-testid={`searchResultItem-${index}`}
          >
            {productInfo.productName}
          </li>
        );
      })}
    </ul>
  );
}

export default SearchFormResultList;
