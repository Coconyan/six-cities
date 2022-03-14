import { createAction } from '@reduxjs/toolkit';
import {
  AppRoute,
  AuthorizationStatus,
  SortTypes
} from '../const';
import { Comments } from '../types/comments';
import {
  City,
  Offer,
  Offers
} from '../types/offer';

export const changeCity = createAction('changeCity', (value: City) => ({
  payload: value,
}));
export const changeSortType = createAction('changeSortType', (value: SortTypes) => ({
  payload: value,
}));
export const loadOffers = createAction('data/loadOffers', (value: Offers) => ({
  payload: value,
}));
export const requireAuthorization = createAction('user/requireAuthorization', (value: AuthorizationStatus) => ({
  payload: value,
}));
export const redirectToRoute = createAction('redirectToRoute', (value: AppRoute) => ({
  payload: value,
}));
export const loadCurrentOffer = createAction('loadCurrentOffer', (value: Offer) => ({
  payload: value,
}));
export const loadCurrentOffersNearby = createAction('loadCurrentOffersNearby', (value: Offers) => ({
  payload: value,
}));
export const loadCurrentOffersComments = createAction('loadCurrentOffersComments', (value: Comments[]) => ({
  payload: value,
}));
