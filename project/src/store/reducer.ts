import { createReducer } from '@reduxjs/toolkit';
import { SortTypes } from '../const';
import { cities } from '../mocks/cities';
import { offers } from '../mocks/offers';
import {
  changeCity,
  fillOffersList,
  changeSortType
} from './actions';

const initialState = {
  cities,
  currentCity: cities[0],
  offers: offers,
  currentSortType: SortTypes.Popular,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.currentSortType = action.payload;
    });
});

export { reducer };
