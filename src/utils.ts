import { AppRoute } from './const';
import { ProductCategory } from './enums';
import { ProductCard } from './types/product-card';
import { ProductRating } from './types/product-rating';
import { Review } from './types/review';

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
    .reduce((prev, curr) => prev + curr);

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

  if (!storeRatings.find((r) => r.productId === productId)) {
    storeRatings.push(rating);
  }

  return storeRatings;
}

export function getTopNProductsByPattern(
  products: ProductCard[],
  pattern: string
) {
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(pattern.toLowerCase())
    );
  return filteredProducts.map((product) => ({
    productName: product.name,
    urlPath: AppRoute.Product.replace(':id', String(product.id)),
  }));
}
