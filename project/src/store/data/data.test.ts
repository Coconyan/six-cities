import { CITIES, SortTypes } from '../../const';
import { cities } from '../../mocks/fake-cities';
import { makeFakeComment } from '../../mocks/fake-comment';
import { makeFakeOffer } from '../../mocks/fake-offer';
import {
  changeCity,
  changeSortType,
  data,
  loadCurrentOffer,
  loadCurrentOfferComments,
  loadCurrentOffersNearby,
  loadFavoriteOffers,
  loadOffers
} from './data';

const offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
const comments = [makeFakeComment(), makeFakeComment()];
const state = {
  cities: CITIES,
  currentCity: cities[0].name,
  offers: [],
  currentOffer: null,
  currentOfferLoading: false,
  currentOffersNearby: null,
  currentOfferComments: null,
  currentMapOffer: null,
  currentSortType: SortTypes.Popular,
  favoriteOffers: null,
  isDataLoaded: false,
};

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        cities: CITIES,
        currentCity: cities[0].name,
        offers: [],
        currentOffer: null,
        currentOfferLoading: false,
        currentOffersNearby: null,
        currentOfferComments: null,
        currentMapOffer: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update city by change city', () => {
    expect(data.reducer(state, changeCity(state.cities[2])))
      .toEqual({
        cities: CITIES,
        currentCity: cities[2].name,
        offers: [],
        currentOffer: null,
        currentOfferLoading: false,
        currentOffersNearby: null,
        currentOfferComments: null,
        currentMapOffer: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update sort type by change sort type', () => {
    expect(data.reducer(state, changeSortType(SortTypes.RatingLowToHigh)))
      .toEqual({
        cities: CITIES,
        currentCity: cities[0].name,
        offers: [],
        currentOffer: null,
        currentOfferLoading: false,
        currentOffersNearby: null,
        currentOfferComments: null,
        currentMapOffer: null,
        currentSortType: SortTypes.RatingLowToHigh,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update offers by load offers', () => {
    expect(data.reducer(state, loadOffers(offers)))
      .toEqual({
        cities: CITIES,
        currentCity: cities[0].name,
        offers: offers,
        currentOffer: null,
        currentOfferLoading: false,
        currentOffersNearby: null,
        currentOfferComments: null,
        currentMapOffer: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: true,
      });
  });

  it('should update offer by load current offer', () => {
    expect(data.reducer(state, loadCurrentOffer(offers[0])))
      .toEqual({
        cities: CITIES,
        currentCity: cities[0].name,
        offers: [],
        currentOffer: offers[0],
        currentOfferLoading: false,
        currentOffersNearby: null,
        currentOfferComments: null,
        currentMapOffer: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update current nearby offers by load current nearby offers', () => {
    expect(data.reducer(state, loadCurrentOffersNearby(offers)))
      .toEqual({
        cities: CITIES,
        currentCity: cities[0].name,
        offers: [],
        currentOffer: null,
        currentOfferLoading: false,
        currentOffersNearby: offers,
        currentOfferComments: null,
        currentMapOffer: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update current offer comments by load current offer comments', () => {
    expect(data.reducer(state, loadCurrentOfferComments(comments)))
      .toEqual({
        cities: CITIES,
        currentCity: cities[0].name,
        offers: [],
        currentOffer: null,
        currentOfferLoading: false,
        currentOffersNearby: null,
        currentOfferComments: comments,
        currentMapOffer: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update favorite offers by load favorite offers', () => {
    expect(data.reducer(state, loadFavoriteOffers(offers)))
      .toEqual({
        cities: CITIES,
        currentCity: cities[0].name,
        offers: [],
        currentOffer: null,
        currentOfferLoading: false,
        currentOffersNearby: null,
        currentOfferComments: null,
        currentMapOffer: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: offers,
        isDataLoaded: false,
      });
  });
});
