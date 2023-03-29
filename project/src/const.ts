import { PointExpression } from 'leaflet';

export enum AppRoute {
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/room',
  Root = '/',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const ICON_SIZE: PointExpression = [40, 40];

export const ICON_ANCHOR: PointExpression = [20, 40];

export const URL_MARKER_DEFAULT =
  'img/pin.svg';

export const URL_MARKER_CURRENT =
  'img/pin-active.svg';

export const SPINNER_COLOR = '#4481c3';

export enum SortTypes {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  RatingLowToHigh = 'Top rated first',
}

export enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite'
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum HTTP_CODE_ERROR_TEXT {
  BAD_REQUEST = 'Bad request',
  UNAUTHORIZED = 'You are unauthorized, please log in',
  NOT_FOUND = 'Page not found',
}

export enum COMMENTS_LENGTH {
  MIN = 50,
  MAX = 300,
}

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
}
