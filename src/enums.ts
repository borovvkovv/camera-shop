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
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Instant = 'Моментальная',
  Collect = 'Коллекционная',
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

export enum QueryParam {
  PriceMin = 'price_gte',
  PriceMax = 'price_lte',
  Category = 'category',
  Type = 'type',
  Level = 'level',
  Order = 'order',
  By = 'by'
}

export enum SliderKeyFrames {
  FadeIn = 'fadeIn',
  FadeOut = 'fadeOut',
  FadeInReverse = 'fadeInReverse',
  FadeOutReverse = 'fadeOutReverse',
}
