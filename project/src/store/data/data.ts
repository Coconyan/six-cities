import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortTypes } from '../../const';
import { cities } from '../../mocks/cities';
import { Data } from '../../types/state';

const initialState: Data = {
  cities,
  currentCity: cities[0],
  offers: [],
  currentOffer: null,
  currentOffersNearby: null,
  currentOffersComments: null,
  currentSortType: SortTypes.Popular,
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
    loadCurrentOffersComments: (state, action) => {
      state.currentOffersComments = action.payload;
    },
  },
});

export const { changeCity, changeSortType, loadOffers, loadCurrentOffer, loadCurrentOffersComments, loadCurrentOffersNearby } = data.actions;
