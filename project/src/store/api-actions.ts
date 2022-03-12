import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, store } from '.';
import { APIRoute } from '../const';
import { Offers } from '../types/offer';
import { loadOffers } from './actions';

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
