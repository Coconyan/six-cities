import { AuthorizationStatus } from '../const.js';
import { store } from '../store/index.js';
import { Comment } from './comments.js';
import {
  City,
  Offer,
  Offers
} from './offer.js';

export type Data = {
  cities: City[],
  currentCity: City,
  offers: Offers,
  currentOffer: Offer | null,
  currentOffersNearby: Offers | null,
  currentOffersComments: Comment[] | null,
  currentSortType: string,
  favoriteOffers: Offers | null,
  isDataLoaded: boolean,
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
