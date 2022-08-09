import { AuthorizationStatus } from '../const.js';
import { store } from '../store/index.js';
import { Comment } from './comments.js';
import {
  Offer,
  Offers
} from './offer.js';

export type Data = {
  cities: string[],
  currentCity: string,
  offers: Offers,
  currentOffer: Offer | null,
  currentOfferLoading: boolean,
  currentOffersNearby: Offers | null,
  currentOfferComments: Comment[] | null,
  currentMapOffer: Offer | null,
  currentSortType: string,
  favoriteOffers: Offers | null,
  isDataLoaded: boolean,
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
