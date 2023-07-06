export type Sort = {
  order?: keyof typeof SortOrder;
  by?: keyof typeof SortBy;
};

export enum SortOrder {
  Asc = 'Asc',
  Desc = 'Desc'
}

export enum SortBy {
  Price = 'Price',
  Popularity = 'Popularity',
}
