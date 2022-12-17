export enum CouponType {
  Camera333 = 'camera-333',
  Camera444 = 'camera-444',
  Camera555 = 'camera-555',
}

export enum AppRoute {
  Home = '/',
  Catalog = '/catalog',
  CatalogEmpty = '/catalog/empty',
  Product = '/catalog/:id',
  NotFound = '/404',
}

export enum ApiRoute {
  Cameras = '/cameras',
  Reviews = '/reviews',
  Similar = '/similar',
  Promo = '/promo',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum NameSpase {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  Product = 'PRODUCT',
}

export enum TabControl {
  Features = 'features',
  Description = 'description'
}

export enum ResponseStatus {
  Initial = 'INITIAL',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
}

enum SocialItem {
  Vk = 'vk',
  Pinterest = 'pinterest',
  Reddit = 'reddit',
}

enum NavigationItem {
  CommonNavigation = 'Навигация',
  Resources = 'Ресурсы',
  Support = 'Поддержка',
}

enum CommonNavItem {
  Catalog = 'Каталог',
  Guaranties = 'Гарантии',
  Delivery = 'Доставка',
  AboutCompany = 'О компании',
}

enum ResourcesNavItem {
  Cources = 'Курсы операторов',
  Blog = 'Блог',
  Community = 'Сообщество',
}

enum SupportNavItem {
  FrequentQuestions = 'FAQ',
  AskQuestion = 'Задать вопрос',
}

export enum Query {
  PageNumber = 'page',
  Tab = 'tab',
  SelectedSortingType = 'sort',
  SelectedOrderType = 'order',
  PriceMin = 'price_gte',
  PriceMax = 'price_lte',
  Category = 'category',
  Type = 'type',
  Level = 'level',
}

export enum GetParameter {
  Like = 'name_like',
  Sort = '_sort',
  Order = '_order',
  PriceMin = 'price_gte',
  PriceMax = 'price_lte',
  Category = 'category',
  Type = 'type',
  Level = 'level',
}

export enum SortParameter {
  Price = 'price',
  Rating = 'rating',
}

enum SortButton {
  Price = 'sortPrice',
  Rating = 'sortPopular',
}


export enum OrderParameter {
  Up = 'asc',
  Down = 'desc',
}

enum OrderButton {
  Up = 'up',
  Down = 'down',
}

export const STARS_COUNT = 5;

export const FILTER_QUERIES = [
  Query.PriceMax,
  Query.PriceMin,
  Query.Category,
  Query.Type,
  Query.Level,
];

export const SORTING_BUTTONS = [
  {value: SortButton.Price, label: 'по цене', sortParameter: SortParameter.Price},
  {value: SortButton.Rating, label: 'по популярности', sortParameter: SortParameter.Rating},
];

export const ORDER_BUTTONS = [
  {
    value: OrderButton.Up,
    label: 'По возрастанию',
    className: 'catalog-sort__btn--up',
    orderParameter: OrderParameter.Up
  },
  {
    value: OrderButton.Down,
    label: 'По убыванию',
    className: 'catalog-sort__btn--down',
    orderParameter: OrderParameter.Down
  },
];

export const TAB_CONTROLS = [
  {value: TabControl.Features, label: 'Характеристики'},
  {value: TabControl.Description, label: 'Описание'}
];

export const SOCIAL_ITEMS = [
  {value: SocialItem.Vk, label: 'вконтатке', path: '#'},
  {value: SocialItem.Pinterest, label: 'pinterest', path: '#'},
  {value: SocialItem.Reddit, label: 'reddit', path: '#'},
];

export const NAVIGATION_ITEMS = [
  {value: NavigationItem.CommonNavigation, label: 'Навигация', content: [
    {value: CommonNavItem.Catalog, label: 'Каталог', path: {pathname: AppRoute.Catalog, search: `?${Query.PageNumber}=1`}},
    {value: CommonNavItem.Guaranties, label: 'Гарантии', path: '#'},
    {value: CommonNavItem.Delivery, label: 'Доставка', path: '#'},
    {value: CommonNavItem.AboutCompany, label: 'О компании', path: '#'},
  ]},
  {
    value: NavigationItem.Resources, label: 'Ресурсы', content: [
      {value: ResourcesNavItem.Cources, label: 'Курсы операторов', path: '#'},
      {value: ResourcesNavItem.Blog, label: 'Блог', path: '#'},
      {value: ResourcesNavItem.Community, label: 'Сообщество', path: '#'},
    ]
  },
  {
    value: NavigationItem.Support, label: 'Поддержка', content: [
      {value: SupportNavItem.FrequentQuestions, label: 'FAQ', path: '#'},
      {value: SupportNavItem.AskQuestion, label: 'Задать вопрос', path: '#'},
    ]
  },
];

export enum Category {
  Photocamera = 'Фотоаппарат',
  Videocamera = 'Видеокамера',
}

export const CATEGORY_BUTTONS = [
  {value: 'photocamera', label: 'Фотоаппарат'},
  {value: 'videocamera', label: 'Видеокамера'}
];

export enum Type {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная',
}

export const TYPE_BUTTONS = [
  {value: 'digital', label: 'Цифровая'},
  {value: 'film', label: 'Плёночная'},
  {value: 'snapshot', label: 'Моментальная'},
  {value: 'collection', label: 'Коллекционная'}
];

export const LEVEL_BUTTONS = [
  {value: 'zero', label: 'Нулевой'},
  {value: 'non-professional', label: 'Любительский'},
  {value: 'professional', label: 'Профессиональный'},
];

export const PAGES_START = 1;

export const CAMERAS_PER_PAGE = 9;

export const REVIEWS_PER_STEP = 3;

export const FIRST_ACTIVE_SIMILARS = [0,1,2];

export const BACK = 'Назад';

export const FORWARD = 'Вперед';

export const HOME_URL_LENGTH = 1;

export const RATING_MARKS = [
  {
    emotion: 'Отлично',
    mark: 5,
  },
  {
    emotion: 'Хорошо',
    mark: 4,
  },
  {
    emotion: 'Нормально',
    mark: 3,
  },
  {
    emotion: 'Плохо',
    mark: 2,
  },
  {
    emotion: 'Ужасно',
    mark: 1,
  }
];

export const BreadcrumbsValue = {
  Main: 'home',
  Catalog: 'catalog',
};

export const BreadcrumbsLabel = {
  Main: 'Главная',
  Catalog: 'Каталог',
};

export const BreadcrumbsPath = {
  Main: '/',
  Catalog: {pathname: AppRoute.Catalog, search: `?${Query.PageNumber}=1`},
};
