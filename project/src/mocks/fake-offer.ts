import {
  name,
  internet,
  datatype
} from 'faker';
import { Offer } from '../types/offer';
import { cities } from './fake-cities';

export const makeFakeOffer = (city = cities[0]): Offer => ({
  city: city,
  previewImage: internet.avatar(),
  images: [internet.avatar(), internet.avatar(), internet.avatar()],
  title: name.title(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(5),
  type: name.title(),
  bedrooms: datatype.number(6),
  maxAdults: datatype.number(9),
  price: datatype.number(2000),
  goods: [name.title(), name.title()],
  host: {
    id: 2,
    name: name.title(),
    isPro: datatype.boolean(),
    avatarUrl: internet.avatar(),
  },
  description: datatype.string(90),
  location: {
    latitude: datatype.number(50),
    longitude: datatype.number(50),
    zoom: datatype.number(13),
  },
  id: datatype.number(100),
} as Offer);
