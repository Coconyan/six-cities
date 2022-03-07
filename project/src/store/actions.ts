import { createAction } from '@reduxjs/toolkit';
import { SortTypes } from '../const';
import {
  City,
  Offer
} from '../types/offer';

export const changeCity = createAction('changeCity', (value: City) => ({
  payload: value,
}));
export const fillOffersList = createAction('fillOffersList', (value: Offer[]) => ({
  payload: value,
}));
export const changeSortType = createAction('changeSortType', (value: SortTypes) => ({
  payload: value,
}));
