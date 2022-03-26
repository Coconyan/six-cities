import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
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
  Comment
} from '../types/comments';
import {
  Offer,
  Offers
} from '../types/offer';
import { AppDispatch, State } from '../types/state';
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

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentOffer = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentOffer',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(loadCurrentOffer(data));
    } catch (error) {
      errorHandle(error);
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchCurrentOffersNearby = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentOffersNearby',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
      dispatch(loadCurrentOffersNearby(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentOffersComments = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentOffersComments',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      dispatch(loadCurrentOffersComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const getFavoriteOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/getFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Favorite);
      dispatch(loadFavoriteOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addOfferToFavorite = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addOfferToFavorite',
  async (offerId: number, {dispatch, extra: api}) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${1}`);
      dispatch(fetchOffersAction());
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addOfferToFavoritePage = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addOfferToFavorite',
  async (offerId: number, {dispatch, extra: api}) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${1}`);
      dispatch(getFavoriteOffers());
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addOfferToFavoriteOfferPage = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addOfferToFavorite',
  async (offerId: number, {dispatch, extra: api}) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${1}`);
      dispatch((fetchCurrentOffer(offerId)));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const removeOfferFromFavorite = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/removeOfferFromFavorite',
  async (offerId: number, {dispatch, extra: api}) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${0}`);
      dispatch(fetchOffersAction());
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const removeOfferFromFavoritePage = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/removeOfferFromFavorite',
  async (offerId: number, {dispatch, extra: api}) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${0}`);
      dispatch(getFavoriteOffers());
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const removeOfferFromFavoriteOfferPage = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/removeOfferFromFavorite',
  async (offerId: number, {dispatch, extra: api}) => {
    try {
      await api.post<number>(`${APIRoute.Favorite}/${offerId}/${0}`);
      dispatch((fetchCurrentOffer(offerId)));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const newCommentAction = createAsyncThunk<void, CommentDataWithOfferId, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/newComment',
  async ({comment, rating, id}: CommentDataWithOfferId, {dispatch, extra: api}) => {
    try {
      await api.post<CommentData>(`${APIRoute.Comments}/${id}`, {comment, rating});
      const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      dispatch(loadCurrentOffersComments(data));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}: AuthData, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      saveEmail(data.email);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dropEmail();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);
