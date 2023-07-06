export enum ProductCategory {
  Video = 'Видеокамера',
  Photo = 'Фотоаппарат',
}

export enum FilterProductCategory {
  Photo = 'Фотокамера',
  Video = 'Видеокамера',
}

export enum ProductInfoTabMode {
  Characteristics = 'characteristics',
  Description = 'description',
}

export enum ProductType {
  Collect = 'Коллекционная',
  Instant = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная',
}

export enum ProductLevel {
  Zero = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный',
}

export enum ProductCardMode {
  Card = 'Card',
  Slider = 'Slider'
}

export enum QueryParams {
  PriceMin = 'price_gte',
  PriceMax = 'price_lte',
  Category = 'category',
  Type = 'type',
  Level = 'level',
  Order = 'order',
  By = 'by'
}
