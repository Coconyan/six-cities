import { createReducer } from '@reduxjs/toolkit';
import { cities } from '../mocks/cities';
import { offers } from '../mocks/offers';
import {
  changeCity,
  fillOffersList
} from './actions';

const initialState = {
  cities,
  currentCity: cities[0],
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
