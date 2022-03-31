import { NameSpace } from '../../const';
import { Comment } from '../../types/comments';
import {
  Offer,
  Offers
} from '../../types/offer';
import { State } from '../../types/state';

export const getCities = (state: State): string[] => state[NameSpace.data].cities;
export const getCurrentCity = (state: State): string => state[NameSpace.data].currentCity;
export const getOffers = (state: State): Offers => state[NameSpace.data].offers;
export const getCurrentOffer = (state: State): Offer | null => state[NameSpace.data].currentOffer;
export const getCurrentMapOffer = (state: State): Offer | null => state[NameSpace.data].currentMapOffer;
export const getCurrentOffersNearby = (state: State): Offers | null => state[NameSpace.data].currentOffersNearby;
export const getCurrentOfferComments = (state: State): Comment[] | null => state[NameSpace.data].currentOfferComments;
export const getCurrentSortType = (state: State): string => state[NameSpace.data].currentSortType;
export const getFavoriteOffers = (state: State): Offers | null => state[NameSpace.data].favoriteOffers;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
