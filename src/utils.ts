import { URLSearchParamsInit } from 'react-router-dom';
import { URLSearchParams } from 'url';
import { AppRoute } from './const';
import {
  FilterProductCategory,
  ProductCategory,
  ProductLevel,
  ProductType,
  QueryParam,
} from './enums';
import { productFilterCategoryMap } from './maps';
import { Filter } from './types/filter';
import { ProductCard } from './types/product-card';
import { ProductRating } from './types/product-rating';
import { Review } from './types/review';
import { Sort, SortBy, SortOrder } from './types/sort';

export function makeProductName(product: ProductCard) {
  return `${product.type} ${
    product.category === ProductCategory.Photo
      ? 'фотокамера'
      : product.category.toLowerCase()
  }`;
}

export function humanizeProductPrice(price: number) {
  return price
    .toLocaleString('en-US', { minimumFractionDigits: 0 })
    .replace(/,/g, ' ');
}

export function formatDateToDayAndMonth(date: Date): string {
  const day = date.toLocaleString('ru-RU', { day: 'numeric' });
  const monthAsNumber = date.toLocaleString('ru-RU', { month: 'numeric' });
  const monthsGnentive = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return `${day} ${monthsGnentive[Number(monthAsNumber) - 1]}`; // "6 марта"
}

export function formatDateToYearMonthDay(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getAverageRating(reviews: Review[]) {
  const ratingSum = reviews
    .map((review) => review.rating)
    .reduce((previous, current) => previous + current);

  return Math.ceil(ratingSum / reviews.length);
}

export function pushRatingIfNotExists(
  storeRatings: ProductRating[],
  reviews: Review[],
  productId: number
) {
  const rating = {
    productId,
    rating: getAverageRating(reviews),
  };

  if (!storeRatings.find((storeRating) => storeRating.productId === productId)) {
    storeRatings.push(rating);
  }

  return storeRatings;
}

export function getTopNProductsByPattern(
  products: ProductCard[],
  pattern: string
) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(pattern.toLowerCase())
  );
  return filteredProducts.map((product) => ({
    productName: product.name,
    urlPath: AppRoute.Product.replace(':id', String(product.id)),
  }));
}

export function filterProducts(
  products: ProductCard[],
  filter: Filter,
  sort: Sort,
  setSearchParams: (nextInit?: URLSearchParamsInit) => void
) {
  const filterTypeValues = filter.type?.map((type) => ProductType[type]);
  const filterLevelValues = filter.level?.map((level) => ProductLevel[level]);

  let filteredProducts = products.filter(
    (product) =>
      (!filter.category ||
        productFilterCategoryMap[FilterProductCategory[filter.category]] ===
          product.category) &&
      (!filterTypeValues?.length || filterTypeValues.includes(product.type)) &&
      (!filterLevelValues?.length || filterLevelValues.includes(product.level))
  );

  let queryParams = getQueryParams(filter, sort);
  let shouldUpdateQueryParams = false;
  const minPrice = getMinPrice(filteredProducts);
  const maxPrice = getMaxPrice(filteredProducts);
  if (
    queryParams[QueryParam.PriceMax] &&
    queryParams[QueryParam.PriceMin] &&
    Number(queryParams[QueryParam.PriceMin]) >
      Number(queryParams[QueryParam.PriceMax])
  ) {
    shouldUpdateQueryParams = true;
    queryParams = {
      ...queryParams,
      [QueryParam.PriceMax]: queryParams[QueryParam.PriceMin],
      [QueryParam.PriceMin]: queryParams[QueryParam.PriceMax],
    };
  }
  if (queryParams[QueryParam.PriceMin] && Number(queryParams[QueryParam.PriceMin]) < minPrice) {
    shouldUpdateQueryParams = true;
    queryParams = {
      ...queryParams,
      [QueryParam.PriceMin]: [String(minPrice)],
    };
  }
  if (queryParams[QueryParam.PriceMax] && Number(queryParams[QueryParam.PriceMax]) > maxPrice) {
    shouldUpdateQueryParams = true;
    queryParams = {
      ...queryParams,
      [QueryParam.PriceMax]: [String(maxPrice)],
    };
  }
  if (queryParams[QueryParam.PriceMin] && Number(queryParams[QueryParam.PriceMin]) > maxPrice) {
    shouldUpdateQueryParams = true;
    queryParams = {
      ...queryParams,
      [QueryParam.PriceMin]: [String(maxPrice)],
    };
  }
  if (queryParams[QueryParam.PriceMax] && Number(queryParams[QueryParam.PriceMax]) < minPrice) {
    shouldUpdateQueryParams = true;
    queryParams = {
      ...queryParams,
      [QueryParam.PriceMax]: [String(minPrice)],
    };
  }

  if (shouldUpdateQueryParams) {
    setSearchParams(queryParams);
  } else {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= (filter.priceRange?.min ?? product.price)
    );
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= (filter.priceRange?.max ?? product.price)
    );
  }
  return filteredProducts;
}

export function getMinPrice(products: ProductCard[]): number {
  return products.length > 0
    ? products.reduce((previous, current) => (previous.price <= current.price ? previous : current))
      .price
    : NaN;
}

export function getMaxPrice(products: ProductCard[]): number {
  return products.length > 0
    ? products.reduce((previous, current) => (previous.price >= current.price ? previous : current))
      .price
    : NaN;
}

export function getFilter(searchParams: URLSearchParams): Filter {
  const priceRangeMin = searchParams.get(QueryParam.PriceMin) ?? undefined;
  const priceRangeMax = searchParams.get(QueryParam.PriceMax) ?? undefined;
  const categoryAsString = searchParams.get(QueryParam.Category);
  const typesAsStringArray = searchParams.getAll(QueryParam.Type);
  const levelsAsStringArray = searchParams.getAll(QueryParam.Level);

  const matchedKey = categoryAsString
    ? Object.keys(FilterProductCategory).find(
      (key) => key.toLowerCase() === categoryAsString?.toLowerCase()
    )
    : undefined;

  const category = matchedKey
    ? (matchedKey as keyof typeof FilterProductCategory)
    : undefined;

  const types: (keyof typeof ProductType)[] = [];
  typesAsStringArray.forEach((type) => {
    const matchedType = Object.keys(ProductType).find(
      (key) => key.toLowerCase() === type?.toLowerCase()
    );

    if (matchedType) {
      types.push(matchedType as keyof typeof ProductType);
    }
  });

  const levels: (keyof typeof ProductLevel)[] = [];
  levelsAsStringArray.forEach((level) => {
    const matchedLevel = Object.keys(ProductLevel).find(
      (key) => key.toLowerCase() === level.toLowerCase()
    );

    if (matchedLevel) {
      levels.push(matchedLevel as keyof typeof ProductLevel);
    }
  });

  return {
    priceRange: {
      min: isNaN(Number(priceRangeMin)) ? undefined : Number(priceRangeMin),
      max: isNaN(Number(priceRangeMax)) ? undefined : Number(priceRangeMax),
    },
    category: category,
    type: types.length ? types : undefined,
    level: levels.length ? levels : undefined,
  };
}

export function getSort(searchParams: URLSearchParams): Sort {
  const orderAsSting = searchParams.get(QueryParam.Order) ?? undefined;
  const byAsString = searchParams.get(QueryParam.By) ?? undefined;

  const matchedKey = orderAsSting
    ? Object.keys(SortOrder).find(
      (key) => key.toLowerCase() === orderAsSting?.toLowerCase()
    )
    : undefined;

  const order = matchedKey ? (matchedKey as keyof typeof SortOrder) : undefined;

  const matchedKeyBy = byAsString
    ? Object.keys(SortBy).find(
      (key) => key.toLowerCase() === byAsString?.toLowerCase()
    )
    : undefined;

  const by = matchedKeyBy ? (matchedKeyBy as keyof typeof SortBy) : undefined;

  return {
    [QueryParam.Order]: order,
    [QueryParam.By]: by,
  };
}

export function getQueryParams(filter: Filter, sort: Sort): Record<string, string[]> {
  const priceMin = filter.priceRange?.min?.toString();
  const priceMax = filter.priceRange?.max?.toString();
  const category = filter.category;
  const type = filter.type;
  const level = filter.level;
  const order = sort.order;
  const by = sort.by;
  let searchParamsObject = {};

  if (priceMin) {
    searchParamsObject = {
      ...searchParamsObject,
      [QueryParam.PriceMin]: priceMin,
    };
  }
  if (priceMax) {
    searchParamsObject = {
      ...searchParamsObject,
      [QueryParam.PriceMax]: priceMax,
    };
  }
  if (category) {
    searchParamsObject = {
      ...searchParamsObject,
      [QueryParam.Category]: category,
    };
  }
  if (type) {
    searchParamsObject = {
      ...searchParamsObject,
      [QueryParam.Type]: type,
    };
  }
  if (level) {
    searchParamsObject = {
      ...searchParamsObject,
      [QueryParam.Level]: level,
    };
  }
  if (order) {
    searchParamsObject = {
      ...searchParamsObject,
      [QueryParam.Order]: order,
    };
  }
  if (by) {
    searchParamsObject = {
      ...searchParamsObject,
      [QueryParam.By]: by,
    };
  }
  return searchParamsObject;
}

export function getStringFromQueryParams(queryParams: Record<string, string[]>) {
  let result = '';
  if (!queryParams || queryParams.length) {
    return result;
  }
  result += '?';
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value instanceof Array) {
      value.forEach((valueItem) => {
        result += `&${key}=${valueItem}`;
      });
    }
    else {
      result += `&${key}=${String(value)}`;
    }
  });
  return result;
}
