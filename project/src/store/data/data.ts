import { createSlice } from '@reduxjs/toolkit';
import {
  CITIES,
  NameSpace,
  SortTypes
} from '../../const';
import { Data } from '../../types/state';

const initialState: Data = {
  cities: CITIES,
  currentCity: CITIES[0],
  offers: [],
  currentOffer: null,
  currentOffersNearby: null,
  currentOfferComments: null,
  currentSortType: SortTypes.Popular,
  favoriteOffers: null,
  isDataLoaded: false,
};

export const data = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.currentCity = action.payload;
    },
    changeSortType: (state, action) => {
      state.currentSortType = action.payload;
    },
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadCurrentOffer: (state, action) => {
      state.currentOffer = action.payload;
    },
    loadCurrentOffersNearby: (state, action) => {
      state.currentOffersNearby = action.payload;
    },
    loadCurrentOfferComments: (state, action) => {
      state.currentOfferComments = action.payload;
    },
    loadFavoriteOffers: (state, action) => {
      state.favoriteOffers = action.payload;
    },
  },
});

export const { changeCity, changeSortType, loadOffers, loadCurrentOffer, loadCurrentOfferComments, loadCurrentOffersNearby, loadFavoriteOffers } = data.actions;
