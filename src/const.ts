export enum CouponType {
  Camera333 = 'camera-333',
  Camera444 = 'camera-444',
  Camera555 = 'camera-555',
}

export enum AppRoute {
  Home = '/',
  Catalog = '/catalog',
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
}

export const STARS_COUNT = 5;

export const PAGE_NUMBER_PARAMETER = 'page';

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

export const PAGES_START = 1;

export const PAGES_NUMBER = 5;

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

export const BreadcrumpsValue = {
  Main: 'home',
  Catalog: 'catalog',
};

export const BreadcrumsLabel = {
  Main: 'Главная',
  Catalog: 'Каталог',
};

export const BreadcrumpsPath = {
  Main: '/',
  Catalog: {pathname: AppRoute.Catalog, search: `?${Query.PageNumber}=1`},
};
