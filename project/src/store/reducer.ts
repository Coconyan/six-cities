import { createReducer } from '@reduxjs/toolkit';
import {
  AuthorizationStatus,
  SortTypes
} from '../const';
import {
  City,
  Offer,
  Offers
} from '../types/offer';
import { cities } from '../mocks/cities';
import {
  changeCity,
  changeSortType,
  loadOffers,
  requireAuthorization,
  loadCurrentOffer,
  loadCurrentOffersNearby,
  loadCurrentOffersComments
} from './actions';
import { Comments } from '../types/comments';

type InitialState = {
  cities: City[],
  currentCity: City,
  offers: Offers,
  currentOffer: Offer | null,
  currentOffersNearby: Offers | null,
  currentOffersComments: Comments[] | null,
  currentSortType: string,
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
}

const initialState: InitialState = {
  cities,
  currentCity: cities[0],
  offers: [],
  currentOffer: null,
  currentOffersNearby: null,
  currentOffersComments: null,
  currentSortType: SortTypes.Popular,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.currentSortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadCurrentOffersNearby, (state, action) => {
      state.currentOffersNearby = action.payload;
    })
    .addCase(loadCurrentOffersComments, (state, action) => {
      state.currentOffersComments = action.payload;
    });
});

export { reducer };
