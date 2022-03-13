import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  api,
  store
} from '.';
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus
} from '../const';
import {
  dropEmail,
  dropToken,
  saveEmail,
  saveToken
} from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offers } from '../types/offer';
import { UserData } from '../types/user-data';
import {
  loadOffers,
  redirectToRoute,
  requireAuthorization
} from './actions';

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    await api.get(APIRoute.Login);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    saveEmail(data.email);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    store.dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropEmail();
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
