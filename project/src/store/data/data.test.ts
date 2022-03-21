import { SortTypes } from '../../const';
import { cities } from '../../mocks/cities';
import { makeFakeComment } from '../../mocks/fake-comment';
import { makeFakeOffer } from '../../mocks/fake-offer';
import {
  changeCity,
  changeSortType,
  data,
  loadCurrentOffer,
  loadCurrentOffersComments,
  loadCurrentOffersNearby,
  loadFavoriteOffers,
  loadOffers
} from './data';

const offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
const comments = [makeFakeComment(), makeFakeComment()];
const state = {
  cities,
  currentCity: cities[0],
  offers: [],
  currentOffer: null,
  currentOffersNearby: null,
  currentOffersComments: null,
  currentSortType: SortTypes.Popular,
  favoriteOffers: null,
  isDataLoaded: false,
};

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        cities,
        currentCity: cities[0],
        offers: [],
        currentOffer: null,
        currentOffersNearby: null,
        currentOffersComments: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update city by change city', () => {
    expect(data.reducer(state, changeCity(state.cities[2])))
      .toEqual({
        cities,
        currentCity: cities[2],
        offers: offers,
        currentOffer: null,
        currentOffersNearby: null,
        currentOffersComments: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update sort type by change sort type', () => {
    expect(data.reducer(state, changeSortType(SortTypes.RatingLowToHigh)))
      .toEqual({
        cities,
        currentCity: cities[0],
        offers: offers,
        currentOffer: null,
        currentOffersNearby: null,
        currentOffersComments: null,
        currentSortType: SortTypes.RatingLowToHigh,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update offers by load offers', () => {
    expect(data.reducer(state, loadOffers(state.offers)))
      .toEqual({
        cities,
        currentCity: cities[0],
        offers: offers,
        currentOffer: null,
        currentOffersNearby: null,
        currentOffersComments: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update offer by load current offer', () => {
    expect(data.reducer(state, loadCurrentOffer(offers[0])))
      .toEqual({
        cities,
        currentCity: cities[0],
        offers: offers,
        currentOffer: offers[0],
        currentOffersNearby: null,
        currentOffersComments: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update current nearby offers by load current nearby offers', () => {
    expect(data.reducer(state, loadCurrentOffersNearby(offers)))
      .toEqual({
        cities,
        currentCity: cities[0],
        offers: offers,
        currentOffer: null,
        currentOffersNearby: offers,
        currentOffersComments: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update current offer comments by load current offer comments', () => {
    expect(data.reducer(state, loadCurrentOffersComments(comments)))
      .toEqual({
        cities,
        currentCity: cities[0],
        offers: offers,
        currentOffer: null,
        currentOffersNearby: null,
        currentOffersComments: comments,
        currentSortType: SortTypes.Popular,
        favoriteOffers: null,
        isDataLoaded: false,
      });
  });

  it('should update favorite offers by load favorite offers', () => {
    expect(data.reducer(state, loadFavoriteOffers(offers)))
      .toEqual({
        cities,
        currentCity: cities[0],
        offers: offers,
        currentOffer: null,
        currentOffersNearby: null,
        currentOffersComments: null,
        currentSortType: SortTypes.Popular,
        favoriteOffers: offers,
        isDataLoaded: false,
      });
  });
});
