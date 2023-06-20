import { ProductCategory } from './enums';
import { ProductCard } from './types/product-card';

export function makeProductName(product: ProductCard) {
  return `${product.type} ${
    product.category === ProductCategory.Photo
      ? 'фотокамера'
      : product.category.toLowerCase()
  }`;
}

export function humanizeProductPrice(price: number) {
  return price.toLocaleString('en-US', { minimumFractionDigits: 0 }).replace(/,/g, ' ');
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
