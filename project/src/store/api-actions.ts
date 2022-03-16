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
import { errorHandle } from '../services/error-handle';
import {
  dropEmail,
  dropToken,
  saveEmail,
  saveToken
} from '../services/token';
import { AuthData } from '../types/auth-data';
import {
  CommentData,
  CommentDataWithOfferId,
  Comments
} from '../types/comments';
import {
  Offer,
  Offers
} from '../types/offer';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './actions';
import {
  loadCurrentOffer,
  loadCurrentOffersComments,
  loadCurrentOffersNearby,
  loadFavoriteOffers,
  loadOffers
} from './data/data';
import { requireAuthorization } from './user-process/user-process';

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentOffer = createAsyncThunk(
  'data/fetchCurrentOffer',
  async (id: number) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      store.dispatch(loadCurrentOffer(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchCurrentOffersNearby = createAsyncThunk(
  'data/fetchCurrentOffersNearby',
  async (id: number) => {
    try {
      const {data} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
      store.dispatch(loadCurrentOffersNearby(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentOffersComments = createAsyncThunk(
  'data/fetchCurrentOffersComments',
  async (id: number) => {
    try {
      const {data} = await api.get<Comments[]>(`${APIRoute.Comments}/${id}`);
      store.dispatch(loadCurrentOffersComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const getFavoriteOffers = createAsyncThunk(
  'data/getFavoriteOffers',
  async () => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Favorite);
      store.dispatch(loadFavoriteOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addOfferToFavorite = createAsyncThunk(
  'data/addOfferToFavorite',
  async (offerId: number) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${1}`);
      store.dispatch(fetchOffersAction());
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addOfferToFavoritePage = createAsyncThunk(
  'data/addOfferToFavorite',
  async (offerId: number) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${1}`);
      store.dispatch(getFavoriteOffers());
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addOfferToFavoriteOfferPage = createAsyncThunk(
  'data/addOfferToFavorite',
  async (offerId: number) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${1}`);
      store.dispatch((fetchCurrentOffer(offerId)));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const removeOfferFromFavorite = createAsyncThunk(
  'data/removeOfferFromFavorite',
  async (offerId: number) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${0}`);
      store.dispatch(fetchOffersAction());
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const removeOfferFromFavoritePage = createAsyncThunk(
  'data/removeOfferFromFavorite',
  async (offerId: number) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${0}`);
      store.dispatch(getFavoriteOffers());
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const removeOfferFromFavoriteOfferPage = createAsyncThunk(
  'data/removeOfferFromFavorite',
  async (offerId: number) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${0}`);
      store.dispatch((fetchCurrentOffer(offerId)));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const newCommentAction = createAsyncThunk(
  'user/newComment',
  async ({comment, rating, id}: CommentDataWithOfferId) => {
    try {
      await api.post<CommentData>(`${APIRoute.Comments}/${id}`, {comment, rating});
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      saveEmail(data.email);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dropEmail();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);
